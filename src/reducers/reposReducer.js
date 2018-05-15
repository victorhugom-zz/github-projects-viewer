import { FETCH_ORG_REPOS, FETCH_REPO } from '../actions/types'
export default function(state = {}, action) {
  console.log(action)
  switch (action.type) {
    case FETCH_ORG_REPOS:
      const result = action.payload.reduce((prev, curr) => {
        prev[curr.name] = curr
        return prev
      }, {})
      return {
        ...state,
        ...result,
      }
    case FETCH_REPO:
      return {
        ...state,
        [action.payload.name]: action.payload,
      }
    default:
      return state
  }
}
