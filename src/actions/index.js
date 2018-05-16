import {
  FETCH_ORG_REPOS,
  FETCH_ORG_REPOS_SUCCESS,
  FETCH_ORG_REPOS_FAILED,
  FETCH_REPO_CONTRIBUTORS,
  FETCH_REPO_CONTRIBUTORS_SUCCESS,
  FETCH_REPO_CONTRIBUTORS_FAILED,
  SET_REPOS_FILTER,
  SELECT_REPO,
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

export const selectRepo = repoName => ({
  type: SELECT_REPO,
  payload: repoName,
})

export const fetchRepoContributors = (contributorsUrl, repoName) => ({
  type: FETCH_REPO_CONTRIBUTORS,
  payload: { url: contributorsUrl, name: repoName },
})

export const fetchRepoContributorsSuccess = data => ({
  type: FETCH_REPO_CONTRIBUTORS_SUCCESS,
  payload: data,
})

export const fetchRepoContributorsFailed = () => ({
  type: FETCH_REPO_CONTRIBUTORS_FAILED,
})

export const filterReposByName = name => ({
  type: SET_REPOS_FILTER,
  payload: name,
})
