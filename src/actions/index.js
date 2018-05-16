import {
  FETCH_ORG_REPOS,
  FETCH_ORG_REPOS_SUCCESS,
  FETCH_ORG_REPOS_FAILED,
  FETCH_REPO,
  FETCH_REPO_SUCCESS,
  FETCH_REPO_FAILED,
} from './types'

export const fetchOrgRepos = (owner = 'facebook') => ({
  type: FETCH_ORG_REPOS,
  payload: { owner },
})

export const fetchOrgReposSuccess = data => ({
  type: FETCH_ORG_REPOS_SUCCESS,
  payload: data,
})

export const fetchOrgReposFailed = () => ({
  type: FETCH_ORG_REPOS_FAILED,
})

export const fetchRepo = (owner = 'facebook', repoName = '') => ({
  type: FETCH_REPO,
  payload: { owner, repoName },
})

export const fetchRepoSuccess = data => ({
  type: FETCH_REPO_SUCCESS,
  payload: data,
})

export const fetchRepoFailed = () => ({
  type: FETCH_REPO_FAILED,
})
