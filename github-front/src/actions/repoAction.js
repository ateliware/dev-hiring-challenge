export const GET_REPOS = 'GET_REPOS';
export const POST_REPOS = 'POST_REPOS';
export const DELETE_REPOS = 'DELETE_REPOS';

export const listAll = (repos) => {
  return {
    type: GET_REPOS,
    payload: repos
  }
}

export const postRepos = (repos) => {
  return{
    type: POST_REPOS,
    payload: repos
  }
}

export const deleteRepos = () => {
  return {
    type: DELETE_REPOS
  }
}