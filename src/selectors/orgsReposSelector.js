import { createSelector } from 'reselect'

const reposItemsSelector = state => state.repos
const compareDesc = (a, b) => (a < b ? 1 : a > b ? -1 : 0)

const orgsReposSelector = createSelector(reposItemsSelector, repos => {
  const result = Object.values(repos) || []

  result.sort((a, b) => compareDesc(a.watchers_count, b.watchers_count))
  return { repos: result }
})

const orgsReposByIdSelector = createSelector(reposItemsSelector, repos => {
  return { repos: repos }
})

const repoById = (state, props) => state.repos[props.match.params.name]
const repoByIdSelector = createSelector(repoById, repo => {
  return { repo: repo }
})

export { orgsReposSelector, orgsReposByIdSelector, repoByIdSelector }
