import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { repoByIdSelector } from '../selectors/orgsReposSelector'

class RepoDetail extends Component {
  state = { isLoading: false }
  componentDidMount() {
    this.fetchRepoDetail()
  }

  fetchRepoDetail() {
    const {
      match: {
        params: { name },
      },
      fetchRepo,
    } = this.props

    fetchRepo('facebook', name).then(
      this.setState({
        isLoading: false,
      }),
    )
  }

  render() {
    const { repo } = this.props
    return <div>{JSON.stringify(repo)}</div>
  }
}

export default connect(repoByIdSelector, actions)(RepoDetail)
