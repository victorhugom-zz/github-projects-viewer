import reposReducer from '../reposReducer'
import { FETCH_ORG_REPOS, FETCH_REPO } from '../../actions/types'
import { dataArray, dataObject } from './mockdata'

describe('repos reducer', () => {
  it('should return the initial state', () => {
    expect(reposReducer(undefined, {})).toEqual({})
  })

  it('should handle FETCH_ORG_REPOS', () => {
    const fetchOrgRepos = {
      type: FETCH_ORG_REPOS,
      payload: dataArray,
    }
    expect(reposReducer({}, fetchOrgRepos)).toEqual(dataObject)
  })
})
