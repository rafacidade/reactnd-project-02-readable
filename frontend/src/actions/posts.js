import { _addPost, _deletePost, _editPost, _voteUpPost, _voteDownPost } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const VOTE_UP_POST = 'VOTE_UP_POST'
export const VOTE_DOWN_POST = 'VOTE_DOWN_POST'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const INCREMENT_COMMENT_COUNTER = 'INCREMENT_COMMENT_COUNTER'

/* ADD POST */
function addPost (post) {
  return {
    type: ADD_POST,
    post,
  }
}

export function handleAddPost (post) {
  return (dispatch) => {
    dispatch(showLoading())

    return _addPost(post)
      .then((post) => dispatch(addPost(post)))
      .then(() => dispatch(hideLoading()))
  }
}

/* EDIT POST */
function editPost (post) {
  return {
    type: EDIT_POST,
    post,
  }
}

export function handleEditPost (post) {
  return (dispatch) => {
    dispatch(showLoading())

    return _editPost(post)
      .then((data) => dispatch(editPost(data)))
      .then(() => dispatch(hideLoading()))
  }
}

/* DELETE */
function deletePost (post) {
  return {
    type: DELETE_POST,
    post,
  }
}

export function handleDeletePost (post) {
  return (dispatch) => {
    dispatch(showLoading())

    return _deletePost(post)
      .then(() => dispatch(deletePost(post)))
      .then(() => dispatch(hideLoading()))
  }
}

export function receivePosts (posts) {
  return {
    type: RECEIVE_POSTS,
    posts,
  }
}

function voteUpPost (post) {
  return {
    type: VOTE_UP_POST,
    post,
  }
}

export function handleVoteUpPost (postId) {
  return (dispatch) => {
    return _voteUpPost(postId)
      .then(post => dispatch(voteUpPost(post)))
      .catch((e) => {
        console.warn('Error in handleVoteUpPost: ', e)
        alert('The was an error voting up the post. Try again.')
      })
  }
}

function voteDownPost (post) {
  return {
    type: VOTE_DOWN_POST,
    post,
  }
}

export function handleVoteDownPost (postId) {
  return (dispatch) => {
    return _voteDownPost(postId)
      .then(post => dispatch(voteDownPost(post)))
  }
}

export function incrementCommentCounter (parentId, incrementValue) {
  return {
    type: INCREMENT_COMMENT_COUNTER,
    parentId,
    incrementValue,
  }
}

