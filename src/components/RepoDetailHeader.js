import React from 'react'
import moment from 'moment'
import { SubTitle, Text, HorizontalBlockBottom, Panel } from '../styledComponents'

const RepoDetailHeader = repo => (
  <Panel>
    <HorizontalBlockBottom>
      <SubTitle>
        Repository: <a href={repo.html_url}>{repo.name} </a>
      </SubTitle>
      <SubTitle>
        Owner: <a href={repo.owner.url}>{repo.owner.login}</a>
      </SubTitle>
      <Text>Created At: {moment(repo.created_at).format('MMMM Do YYYY')}</Text>
      <Text>Updated At: {moment(repo.updated_at).format('MMMM Do YYYY')}</Text>
      <Text>Watchers: {repo.watchers}</Text>
      <Text>Forks: {repo.forks}</Text>
    </HorizontalBlockBottom>
  </Panel>
)

export default RepoDetailHeader
