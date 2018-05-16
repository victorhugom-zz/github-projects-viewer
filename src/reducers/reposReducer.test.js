import reposReducer from './reposReducer'
import { FETCH_ORG_REPOS, FETCH_REPO, FETCH_ORG_REPOS_SUCCESS } from './../actions/types'

const dataArray = [
  {
    id: 165883,
    name: 'codemod',
  },
  {
    id: 455600,
    name: 'hhvm',
  },
]

const dataObject = {
  items: { codemod: { id: 165883, name: 'codemod' }, hhvm: { id: 455600, name: 'hhvm' } },
  loadingRepos: false,
}

describe('repos reducer', () => {
  it('should return the initial state', () => {
    expect(reposReducer(undefined, {})).toEqual({ items: {} })
  })

  it('should handle FETCH_ORG_REPOS', () => {
    const fetchOrgRepos = {
      type: FETCH_ORG_REPOS_SUCCESS,
      payload: dataArray,
    }
    expect(reposReducer({}, fetchOrgRepos)).toEqual(dataObject)
  })
})
