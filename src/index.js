import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { injectGlobal } from 'styled-components'

import epics from './epics'
import App from './App'
import reducers from './reducers'

injectGlobal`
  body,
  html,
  #root {
    width: 100%;
    height: 100%;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
      'Open Sans', 'Helvetica Neue', sans-serif;
  }
`

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
