import 'rxjs'
import { ajax } from 'rxjs/observable/dom/ajax'
import { Observable } from 'rxjs'

import { FETCH_ORG_REPOS, FETCH_REPO_CONTRIBUTORS } from '../actions/types'
import {
  fetchOrgReposSuccess,
  fetchOrgReposFailed,
  fetchRepoContributorsSuccess,
  fetchRepoContributorsFailed,
} from '../actions'

const fetchOrgReposRequest = (owner, page = 0) =>
  ajax
    .getJSON(`https://api.github.com/users/${owner}/repos?page=${page}`)
    .retry(3)
    .flatMap(items => {
      const items$ = Observable.from(items)
      const next$ = items.length > 0 ? fetchOrgReposRequest(owner, page + 1) : Observable.empty()
      return Observable.concat(items$, next$)
    })

export const fetchOrgRepos = actions$ =>
  actions$.ofType(FETCH_ORG_REPOS).mergeMap(action => {
    return fetchOrgReposRequest(action.payload.owner)
      .toArray(repos => repos)
      .map(repos => fetchOrgReposSuccess(repos))
      .takeUntil(actions$.ofType(FETCH_ORG_REPOS))
      .catch(error => Observable.of(fetchOrgReposFailed()))
  })

export const fetchRepoContributors = actions$ =>
  actions$.ofType(FETCH_REPO_CONTRIBUTORS).mergeMap(action => {
    return ajax
      .getJSON(`${action.payload.url}`)
      .map(contributors =>
        fetchRepoContributorsSuccess({ contributors, name: action.payload.name }),
      )
      .takeUntil(actions$.ofType(FETCH_REPO_CONTRIBUTORS))
      .retry(2)
      .catch(error => Observable.of(fetchRepoContributorsFailed()))
  })
