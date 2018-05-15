import axios from 'axios'
import { FETCH_ORG_REPOS, FETCH_REPO } from './types'

export const fetchOrgRepos = (user = 'facebook', page = 1) => async dispatch => {
  const res = await axios.get(`https://api.github.com/users/${user}/repos?page=${page}`)
  dispatch({
    type: FETCH_ORG_REPOS,
    payload: res.data,
  })
}

export const fetchRepo = (owner = 'facebook', reposName) => async dispatch => {
  const res = await axios.get(`https://api.github.com/repos/${owner}/${reposName}`)
  dispatch({
    type: FETCH_REPO,
    payload: res.data,
  })
}
