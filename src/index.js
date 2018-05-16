import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable'

import epics from './epics'
import App from './App'
import reducers from './reducers'

const epicMiddleware = createEpicMiddleware(epics)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducers,
  { repos: { items: [], filter: '' } },
  composeEnhancers(applyMiddleware(epicMiddleware)),
)

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root'),
)
