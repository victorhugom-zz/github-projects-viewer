import {
  FETCH_ORG_REPOS,
  FETCH_ORG_REPOS_SUCCESS,
  FETCH_REPO_CONTRIBUTORS,
  FETCH_REPO_CONTRIBUTORS_SUCCESS,
  SET_REPOS_FILTER,
  SELECT_REPO,
} from '../actions/types'
export default function(state = { items: {} }, action) {
  switch (action.type) {
    case FETCH_ORG_REPOS:
      return {
        ...state,
        loadingRepos: true,
      }

    case FETCH_ORG_REPOS_SUCCESS:
      const result = action.payload.reduce((prev, curr) => {
        prev[curr.name] = curr
        return prev
      }, {})
      return {
        ...state,
        loadingRepos: false,
        items: {
          ...state.items,
          ...result,
        },
      }
    case SET_REPOS_FILTER:
      return {
        ...state,
        filter: action.payload,
      }
    case SELECT_REPO:
      return {
        ...state,
        selectedItemName: action.payload,
      }
    case FETCH_REPO_CONTRIBUTORS:
      return {
        ...state,
        loadingRepo: true,
      }
    case FETCH_REPO_CONTRIBUTORS_SUCCESS:
      return {
        ...state,
        loadingRepo: false,
        selectedItemName: action.payload.name,
        items: {
          ...state.items,
          [action.payload.name]: {
            ...state.items[action.payload.name],
            contributors: action.payload.contributors,
          },
        },
      }
    default:
      return state
  }
}
