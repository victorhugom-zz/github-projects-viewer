import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { repoByIdSelector } from '../selectors/orgsReposSelector'

class RepoDetail extends Component {
  state = { isLoading: false }

  fetchRepoDetail(repoName) {
    const { fetchRepo } = this.props

    fetchRepo('facebook', repoName)
  }

  componentWillReceiveProps = nextProps => {
    if (this.props.match.params.name !== nextProps.match.params.name) {
      this.fetchRepoDetail(nextProps.match.params.name)
    }
  }

  render() {
    const { repo } = this.props
    return <pre>{JSON.stringify(repo, null, 4)}</pre>
  }
}

export default connect(repoByIdSelector, actions)(RepoDetail)
