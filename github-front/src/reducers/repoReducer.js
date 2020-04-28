import {
  GET_REPOS,
  POST_REPOS,
  DELETE_REPOS
} from '../actions/repoAction';

export default (state = [], {type, payload}) => {
  switch(type){
    case GET_REPOS:
      return state = [...state, ...payload];
    
    case POST_REPOS:
      return state = [...state, ...payload];

    case DELETE_REPOS:
      return [];

    default:
      return state;
  }
}