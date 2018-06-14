import { combineEpics } from 'redux-observable'
import { fetchOrgRepos, fetchRepoContributors } from './reposEpics'

export default combineEpics(fetchOrgRepos, fetchRepoContributors)
