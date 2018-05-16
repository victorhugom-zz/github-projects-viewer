import { createSelector } from 'reselect'

const compareDesc = (a, b) => (a < b ? 1 : a > b ? -1 : 0)

const reposItemsSelector = state => {
  return {
    repos: state.repos.items,
    filter: state.repos.filter.toLowerCase(),
    selectedItemName: state.repos.selectedItemName,
    loadingRepos: state.repos.loadingRepos,
  }
}
const orgsReposSelector = createSelector(reposItemsSelector, data => {
  const items = Object.values(data.repos) || []

  const result = items
    .filter(x => x.name.toLowerCase().indexOf(data.filter) >= 0)
    .sort((a, b) => compareDesc(a.watchers_count, b.watchers_count))

  return {
    ...data,
    repos: result,
  }
})

const repoById = (state, props) => state.repos.items[props.match.params.name]
const loadingRepo = (state, props) => state.repos.loadingRepo
const repoByIdSelector = createSelector(repoById, loadingRepo, (repo, loadingRepo) => {
  return {
    loadingRepo,
    repo,
  }
})

export { orgsReposSelector, repoByIdSelector }
