import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Subject } from 'rxjs'
import styled from 'styled-components'
import * as actions from '../actions'

import { orgsReposSelector } from '../selectors/orgsReposSelector'
import { Title, Hover, HrLineLight, GrayInput, ElipsedText } from '../styledComponents'

const SidebarItemBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 10px;
  padding-bottom: 10px;
`

const SidebarItemLink = SidebarItemBlock.extend`
  font-weight: ${props => (props.selected ? 'bold' : '')};
  color: ${props => (props.selected ? '#00acff' : 'gray')};
`

const SidebarItem = repo => (
  <Hover>
    <Link to={`/repo/${repo.name}`} style={{ textDecoration: 'none' }}>
      <SidebarItemLink selected={repo.selected}>
        <ElipsedText>{repo.name}</ElipsedText>
        <span>{repo.watchers_count}</span>
      </SidebarItemLink>
    </Link>
  </Hover>
)

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
    }
  }

  componentDidMount() {
    this.props.fetchOrgRepos()
    this.subscription = this.onSearch$
      .debounceTime(300)
      .subscribe(search => this.props.filterReposByName(search))
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
  onSearch$ = new Subject()

  onSearch = e => {
    const search = e.target.value
    this.setState({ search })
    this.onSearch$.next(search)
  }

  render() {
    const { repos, loadingRepos } = this.props
    const { search } = this.state

    return (
      <div
        style={{
          height: '100vh',
          borderRight: '1px solid rgb(223, 223, 223)',
          width: 300,
          padding: 10,
          overflow: 'auto',
          position: 'fixed',
          left: 0,
          top: 0,
        }}
      >
        <Title>Facebook Github Repositories</Title>
        <GrayInput
          style={{ width: '100%' }}
          type="text"
          placeholder="Search"
          value={search}
          onChange={this.onSearch}
        />
        <HrLineLight />
        <SidebarItemBlock>
          <span>Repository</span>
          <span>Watchers</span>
        </SidebarItemBlock>
        <HrLineLight />

        {loadingRepos ? (
          <SidebarItemBlock>LOADING</SidebarItemBlock>
        ) : (
          repos.map(repo => (
            <SidebarItem
              key={repo.id}
              {...repo}
              selected={this.props.selectedItemName === repo.name}
            />
          ))
        )}
      </div>
    )
  }
}

Sidebar.propTypes = {
  fetchOrgRepos: PropTypes.func.isRequired,
  filterReposByName: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  loadingRepos: PropTypes.bool.isRequired,
  selectedItemName: PropTypes.string.isRequired,
}

export default connect(
  orgsReposSelector,
  actions,
)(Sidebar)
