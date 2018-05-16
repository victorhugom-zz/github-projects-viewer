import nock from 'nock'
import configureMockStore from 'redux-mock-store'
import { createEpicMiddleware } from 'redux-observable'
import { FETCH_REPO, FETCH_REPO_SUCCESS, FETCH_REPO_FAILED } from '../actions/types'
import { fetchRepo } from '../actions'
import epics from '../epics'
import XMLHttpRequest from 'xhr2'
global.XMLHttpRequest = XMLHttpRequest

const epicMiddleware = createEpicMiddleware(epics)
const mockStore = configureMockStore([epicMiddleware])

describe('fetchRepo', () => {
  let store

  beforeEach(() => {
    store = mockStore()
  })

  afterEach(() => {
    nock.cleanAll()
    epicMiddleware.replaceEpic(epics)
  })

  it('returns repo create-react-app from github', done => {
    const payload = { owner: 'facebook', repoName: 'create-react-app' }
    const body = [
      {
        id: 165883,
        name: 'create-react-app',
      },
    ]
    nock('https://api.github.com')
      .get('/repos/facebook/create-react-app')
      .reply(200, body)

    const expectedActions = [
      { type: FETCH_REPO, payload },
      { type: FETCH_REPO_SUCCESS, payload: body },
    ]

    store.subscribe(() => {
      const actions = store.getActions()
      if (actions.length === expectedActions.length) {
        expect(actions).toEqual(expectedActions)
        done()
      }
    })

    store.dispatch(fetchRepo('facebook', 'create-react-app'))
  })

  it('handles get repo create-react-app error', done => {
    const payload = { owner: 'facebook', repoName: 'create-react-app' }

    nock('https://api.github.com')
      .get('/repos/facebook/create-react-app')
      .reply(404)

    const expectedActions = [{ type: FETCH_REPO, payload }, { type: FETCH_REPO_FAILED }]

    store.subscribe(() => {
      const actions = store.getActions()
      if (actions.length === expectedActions.length) {
        expect(actions).toEqual(expectedActions)
        done()
      }
    })

    store.dispatch(fetchRepo('facebook', 'create-react-app'))
  })
})
