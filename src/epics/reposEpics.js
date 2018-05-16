import 'rxjs'
import { ajax } from 'rxjs/observable/dom/ajax'
import { Observable } from 'rxjs'

import { FETCH_ORG_REPOS, FETCH_REPO } from '../actions/types'
import {
  fetchOrgReposSuccess,
  fetchOrgReposFailed,
  fetchRepoSuccess,
  fetchRepoFailed,
} from '../actions'

export const fetchOrgRepos = actions$ =>
  actions$.ofType(FETCH_ORG_REPOS).mergeMap(action =>
    ajax
      .getJSON(`https://api.github.com/users/${action.payload.owner}/repos`)
      .map(repos => fetchOrgReposSuccess(repos))
      .takeUntil(actions$.ofType(FETCH_ORG_REPOS))
      .retry(2)
      .catch(error => Observable.of(fetchOrgReposFailed())),
  )

export const fetchRepo = actions$ =>
  actions$.ofType(FETCH_REPO).mergeMap(action =>
    ajax
      .getJSON(`https://api.github.com/repos/${action.payload.owner}/${action.payload.repoName}`)
      .map(repo => fetchRepoSuccess(repo))
      .takeUntil(actions$.ofType(FETCH_REPO))
      .retry(2)
      .catch(error => Observable.of(fetchRepoFailed())),
  )
