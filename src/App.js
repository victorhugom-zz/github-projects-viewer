import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Sidebar from './components/Sidebar'
import RepoDetail from './components/RepoDetail'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div style={{ display: 'table' }}>
          <Sidebar />
          <div
            style={{
              position: 'absolute',
              left: 300,
            }}
          >
            <Route path="/repo/:name" component={RepoDetail} />
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
