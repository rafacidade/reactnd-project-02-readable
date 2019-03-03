import { _getPostComments, _addComment, _getComment, _deleteComment, _editComment, _voteUpComment, _voteDownComment } from '../utils/api'
import { incrementCommentCounter } from './posts'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const GET_POST_COMMENTS = 'GET_POST_COMMENTS'
export const VOTE_UP_COMMENT = 'VOTE_UP_COMMENT'
export const VOTE_DOWN_COMMENT = 'VOTE_DOWN_COMMENT'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const GET_COMMENT = 'GET_COMMENT'

/* ADD COMMENT */
function addComment (comment) {
  return {
    type: ADD_COMMENT,
    comment,
  }
}

export function handleAddComment (comment) {
  return (dispatch) => {
    const { parentId } = comment

    dispatch(showLoading())

    return _addComment(comment)
      .then((comment) => dispatch(addComment(comment)))
      .then(() => dispatch(incrementCommentCounter(parentId, 1)))
      .then(() => dispatch(hideLoading()))
  }
}

/* EDIT COMMENT */
function editComment (comment) {
  return {
    type: EDIT_COMMENT,
    comment,
  }
}

export function handleEditComment (comment) {
  return (dispatch) => {
    dispatch(showLoading())

    return _editComment(comment)
      .then((comment) => dispatch(editComment(comment)))
      .then(() => dispatch(hideLoading()))
  }
}

export function receiveComments (comments) {
  return {
    type: RECEIVE_COMMENTS,
    comments,
  }
}

function getPostComments (comments) {
  return {
    type: GET_POST_COMMENTS,
    comments,
  }
}

export function handleGetPostComments(commentId) {
  return (dispatch) => {
    return _getPostComments(commentId)
      .then((comments) => {
        dispatch(getPostComments(comments))
      })
  }
}

function voteUpComment (comment) {
  return {
    type: VOTE_UP_COMMENT,
    comment,
  }
}

export function handleVoteUpComment (commentId) {
  return (dispatch) => {
    return _voteUpComment(commentId)
      .then(comment => dispatch(voteUpComment(comment)))
  }
}

function voteDownComment (comment) {
  return {
    type: VOTE_DOWN_COMMENT,
    comment,
  }
}

export function handleVoteDownComment (commentId) {
  return (dispatch) => {
    return _voteDownComment(commentId)
      .then(comment => dispatch(voteDownComment(comment)))
  }
}

function deleteComment (comment) {
  return {
    type: DELETE_COMMENT,
    comment,
  }
}

export function handleDeleteComment (comment) {
  return (dispatch) => {
    dispatch(showLoading())
    const { parentId } = comment

    return _deleteComment(comment)
      .then(() => dispatch(deleteComment(comment)))
      .then(() => dispatch(incrementCommentCounter(parentId, -1)))
      .then(() => dispatch(hideLoading()))
  }
}

function getComment (comment) {
  return {
    type: GET_COMMENT,
    comment,
  }
}

export function handleGetComment (commentId) {
  return (dispatch) => {
    dispatch(showLoading())
    return _getComment(commentId)
      .then((comment) => dispatch(getComment(comment)))
      .then(() => dispatch(hideLoading()))
  }
}