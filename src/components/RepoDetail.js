import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { repoByIdSelector } from '../selectors/orgsReposSelector'

class RepoDetail extends Component {
  componentWillUpdate(nextProps, nextState) {
    const { fetchRepoContributors, selectRepo } = this.props
    if (nextProps.repo && !nextProps.repo.contributors) {
      fetchRepoContributors(nextProps.repo.contributors_url, nextProps.match.params.name)
    }
    selectRepo(nextProps.match.params.name)
  }

  render() {
    const { repo, loadingRepo } = this.props
    return loadingRepo ? <p>LOADING</p> : <pre>{JSON.stringify(repo, null, 4)}</pre>
  }
}

export default connect(repoByIdSelector, actions)(RepoDetail)
