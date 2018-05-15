import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Link } from 'react-router-dom'
import { orgsReposSelector } from '../selectors/orgsReposSelector'

const SidebarItem = repo => {
  return (
    <div>
      <Link
        to={`/repo/${repo.name}`}
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
        }}
      >
        <span
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: 200,
          }}
        >
          {repo.name}
        </span>
        <span>{repo.watchers_count}</span>
      </Link>
    </div>
  )
}

class Sidebar extends Component {
  componentDidMount() {
    this.props.fetchOrgRepos()
  }

  render() {
    const { repos } = this.props

    return (
      <div
        style={{
          height: '100vh',
          display: 'table-cell',
          background: 'black',
          width: 300,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            color: 'white',
          }}
        >
          <span>Repository</span>
          <span>Watchers</span>
        </div>
        {repos.map(repo => <SidebarItem key={repo.id} {...repo} />)}
      </div>
    )
  }
}

export default connect(orgsReposSelector, actions)(Sidebar)
