import { combineReducers } from 'redux';
import repo from './repoReducer';
import loadingReducer from './loadingReducer';

export default combineReducers({repo, loadingReducer});