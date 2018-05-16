import { combineEpics } from 'redux-observable'
import { fetchOrgRepos, fetchRepo } from './reposEpics'

export default combineEpics(fetchOrgRepos, fetchRepo)
