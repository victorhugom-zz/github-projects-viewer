import nock from 'nock'
import configureMockStore from 'redux-mock-store'
import { createEpicMiddleware } from 'redux-observable'
import XMLHttpRequest from 'xhr2'
global.XMLHttpRequest = XMLHttpRequest

import { FETCH_ORG_REPOS, FETCH_ORG_REPOS_SUCCESS, FETCH_ORG_REPOS_FAILED } from '../actions/types'
import { fetchOrgRepos } from '../actions'
import epics from '../epics'

const epicMiddleware = createEpicMiddleware(epics)
const mockStore = configureMockStore([epicMiddleware])

describe('fetchOrgRepos', () => {
  let store

  beforeEach(() => {
    store = mockStore()
  })

  afterEach(() => {
    nock.cleanAll()
    epicMiddleware.replaceEpic(epics)
  })

  it('returns repo list from github', done => {
    const payload = { owner: 'facebook' }
    const body = [
      {
        id: 165883,
        name: 'codemod',
      },
      {
        id: 455600,
        name: 'hhvm',
      },
    ]

    nock('https://api.github.com')
      .get(/users.*/)
      .query({ page: 0 })
      .reply(200, body)

    nock('https://api.github.com')
      .get(/users.*/)
      .query({ page: 1 })
      .reply(200, [])

    const expectedActions = [
      { type: FETCH_ORG_REPOS, payload },
      { type: FETCH_ORG_REPOS_SUCCESS, payload: body },
    ]

    store.subscribe(() => {
      const actions = store.getActions()
      if (actions.length === expectedActions.length) {
        expect(actions).toEqual(expectedActions)
        done()
      }
    })

    store.dispatch(fetchOrgRepos('facebook'))
  })

  it('handles get repo list error', done => {
    const payload = { owner: 'facebook' }
    nock('https://api.github.com')
      .get('/users/facebook/repos')
      .reply(404)

    const expectedActions = [{ type: FETCH_ORG_REPOS, payload }, { type: FETCH_ORG_REPOS_FAILED }]

    store.subscribe(() => {
      const actions = store.getActions()
      if (actions.length === expectedActions.length) {
        expect(actions).toEqual(expectedActions)
        done()
      }
    })

    store.dispatch(fetchOrgRepos('facebook'))
  })
})
