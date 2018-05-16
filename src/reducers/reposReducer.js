import { FETCH_ORG_REPOS_SUCCESS, FETCH_REPO_SUCCESS } from '../actions/types'
export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_ORG_REPOS_SUCCESS:
      const result = action.payload.reduce((prev, curr) => {
        prev[curr.name] = curr
        return prev
      }, {})
      return {
        ...state,
        ...result,
      }
    case FETCH_REPO_SUCCESS:
      return {
        ...state,
        [action.payload.name]: action.payload,
      }
    default:
      return state
  }
}
