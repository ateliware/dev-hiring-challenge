import {
  START_LOADING,
  END_LOADING,
  IDLE
} from '../actions/searchAction';

export default (state = {loading: IDLE}, {type}) => {
  switch(type){

    case START_LOADING:
      return  state = {...state, loading: START_LOADING};

    case END_LOADING:
      return state = {...state, loading: END_LOADING};

    case IDLE:
      return state = {...state, loading: IDLE};

    default:
      return state;

  }
}