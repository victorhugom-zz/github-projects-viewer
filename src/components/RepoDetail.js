import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import * as actions from '../actions'
import { repoByIdSelector } from '../selectors/orgsReposSelector'
import {
  SubTitle,
  VerticalBlock,
  HorizontalBlockTop,
  HrLineLight,
  Panel,
} from '../styledComponents'
import Contributors from './ContributorList'
import RepoDetailHeader from './RepoDetailHeader'

class RepoDetail extends Component {
  state = {}

  static getDerivedStateFromProps(nextProps) {
    const { fetchRepoContributors, selectRepo, repo } = nextProps

    if (repo && !repo.contributors) {
      fetchRepoContributors(nextProps.repo.contributors_url, nextProps.match.params.name)
    }
    selectRepo(nextProps.match.params.name)
    return null
  }

  render() {
    const { repo, loadingRepo } = this.props
    return loadingRepo || !repo ? (
      <p style={{ padding: 30 }}>LOADING</p>
    ) : (
      <div style={{ padding: 20 }}>
        <VerticalBlock>
          <RepoDetailHeader {...repo} />
          <HorizontalBlockTop>
            <Panel style={{ width: 300 }}>
              <SubTitle>Description</SubTitle>
              <HrLineLight />
              {repo.description}
            </Panel>
            {repo.contributors ? <Contributors contributors={repo.contributors} /> : null}
          </HorizontalBlockTop>
        </VerticalBlock>
      </div>
    )
  }
}

RepoDetail.propTypes = {
  repo: PropTypes.object.isRequired,
  loadingRepo: PropTypes.bool.isRequired,
}

export default connect(
  repoByIdSelector,
  actions,
)(RepoDetail)
