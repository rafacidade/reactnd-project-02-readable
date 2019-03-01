import { combineReducers } from 'redux'
import categories from './categories'
import posts from './posts'
import dataLoaded from './dataLoaded'
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
  categories,
  posts,
  dataLoaded,
  loadingBar: loadingBarReducer,
})