import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Link } from 'react-router-dom'
import { Subject } from 'rxjs'
import { orgsReposSelector } from '../selectors/orgsReposSelector'
import styled from 'styled-components'

const StyledTitle = styled.h1`
  font-size: 1em;
  text-align: center;
  color: gray;
`
const StyledInput = styled.input`
  height: 30px
  color: black;
  background: #e9e8e6;
  border: none;
  border-radius: 3px;
`
const StyledSidebarItem = styled.div`
  display: flex;
  flex=direction: row;
  justify-content: space-between;
  margin-top: 15px;
`

const StyledSidebarItemLink = StyledSidebarItem.extend`
  font-weight: ${props => (props.selected ? 'bold' : '')};
  color: ${props => (props.selected ? '#00acff' : 'gray')};
`

const StyledElipsedText = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  width: 200px;
`

const StyledHr = styled.hr`
  border: 1px #dfdfdf solid;
`

const SidebarItem = repo => {
  return (
    <div>
      <Link to={`/repo/${repo.name}`} style={{ textDecoration: 'none' }}>
        <StyledSidebarItemLink selected={repo.selected}>
          <StyledElipsedText>{repo.name}</StyledElipsedText>
          <span>{repo.watchers_count}</span>
        </StyledSidebarItemLink>
      </Link>
    </div>
  )
}

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
    }
    this.onSearch$ = new Subject()
    this.onSearch = this.onSearch.bind(this)
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

  onSearch(e) {
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
          display: 'table-cell',
          borderRight: '1px #dfdfdf solid',
          width: 300,
          padding: 10,
        }}
      >
        <StyledTitle>Facebook Github Repositories</StyledTitle>
        <StyledInput
          style={{ width: '100%' }}
          type="text"
          value={search}
          onChange={this.onSearch}
        />
        <StyledHr />
        <StyledSidebarItem>
          <span>Repository</span>
          <span>Watchers</span>
        </StyledSidebarItem>
        <StyledHr />

        {loadingRepos ? (
          <StyledSidebarItem>LOADING</StyledSidebarItem>
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

export default connect(orgsReposSelector, actions)(Sidebar)
