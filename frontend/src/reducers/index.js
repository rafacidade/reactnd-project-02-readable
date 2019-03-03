import { combineReducers } from 'redux'
import categories from './categories'
import posts from './posts'
import comments from './comments'
import dataLoaded from './dataLoaded'
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
  categories,
  posts,
  comments,
  dataLoaded,
  loadingBar: loadingBarReducer,
})