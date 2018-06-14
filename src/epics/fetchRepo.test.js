import nock from 'nock'
import configureMockStore from 'redux-mock-store'
import { createEpicMiddleware } from 'redux-observable'
import XMLHttpRequest from 'xhr2'
import {
  FETCH_REPO_CONTRIBUTORS,
  FETCH_REPO_CONTRIBUTORS_SUCCESS,
  FETCH_REPO_CONTRIBUTORS_FAILED,
} from '../actions/types'
import { fetchRepoContributors } from '../actions'
import epics from '../epics'

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
    const payload = {
      url: 'https://api.github.com/repos/facebook/360-Capture-SDK/contributors',
      name: 'create-react-app',
    }

    const body = [
      { id: 6290539, login: 'grancia' },
      {
        id: 5921968,
        login: 'cg439',
      },
    ]

    nock('https://api.github.com')
      .get('/repos/facebook/360-Capture-SDK/contributors')
      .reply(200, body)

    const expectedActions = [
      { type: FETCH_REPO_CONTRIBUTORS, payload },
      {
        type: FETCH_REPO_CONTRIBUTORS_SUCCESS,
        payload: { contributors: body, name: 'create-react-app' },
      },
    ]

    store.subscribe(() => {
      const actions = store.getActions()
      if (actions.length === expectedActions.length) {
        expect(actions).toEqual(expectedActions)
        done()
      }
    })

    store.dispatch(
      fetchRepoContributors(
        'https://api.github.com/repos/facebook/360-Capture-SDK/contributors',
        'create-react-app',
      ),
    )
  })

  it('handles get repo create-react-app error', done => {
    const payload = {
      url: 'https://api.github.com/repos/facebook/360-Capture-SDK/contributors',
      name: 'create-react-app',
    }

    nock('https://api.github.com')
      .get('/repos/facebook/create-react-app')
      .reply(404)

    const expectedActions = [
      { type: FETCH_REPO_CONTRIBUTORS, payload },
      { type: FETCH_REPO_CONTRIBUTORS_FAILED },
    ]

    store.subscribe(() => {
      const actions = store.getActions()
      if (actions.length === expectedActions.length) {
        expect(actions).toEqual(expectedActions)
        done()
      }
    })

    store.dispatch(
      fetchRepoContributors(
        'https://api.github.com/repos/facebook/360-Capture-SDK/contributors',
        'create-react-app',
      ),
    )
  })
})
