import { _getPostComments, _addComment, _getComment, _deleteComment, _editComment, _voteUpComment, _voteDownComment } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const GET_POST_COMMENTS = 'GET_POST_COMMENTS'
export const VOTE_UP_COMMENT = 'VOTE_UP_COMMENT'
export const VOTE_DOWN_COMMENT = 'VOTE_DOWN_COMMENT'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

/* ADD COMMENT */
function addComment (comment) {
  return {
    type: ADD_COMMENT,
    comment,
  }
}

export function handleAddComment (body, author, parentId) {
  return (dispatch, getState) => {

    dispatch(showLoading())

    return _addComment({
      body, 
      author, 
      parentId,
    })
      .then((comment) => dispatch(addComment(comment)))
      .then(() => dispatch(hideLoading()))
  }
}

/* EDIT COMMENT */
function editComment (post) {
  return {
    type: EDIT_COMMENT,
    post,
  }
}

export function handleEditComment (post) {
  return (dispatch, getState) => {
    
    dispatch(showLoading())

    return _editComment({
      post
    })
      .then((post) => dispatch(editComment(post)))
      .then(() => dispatch(hideLoading()))
  }
}

export function receiveComments (comments) {
  return {
    type: RECEIVE_COMMENTS,
    comments,
  }
}

function getPostComments (post, comments) {
  return {
    type: GET_POST_COMMENTS,
    post,
    comments,
  }
}

export function handleGetPostComments(post) {
  return (dispatch) => {
    return _getPostComments(post)
      .then((comments) => {
        dispatch(getPostComments(post, comments))
        console.log(comments)
      })
  }
}

function voteUpComment ({ post }) {
  return {
    type: VOTE_UP_COMMENT,
    post,
    option: 'voteUp'
  }
}

export function handleVoteUpComment (info) {
  return (dispatch) => {
    dispatch(voteUpComment(info))

    return _voteUpComment(info)
      .catch((e) => {
        console.warn('Error in handleVoteUpComment: ', e)
        //dispatch(voteUpComment(info))n   que alerna like
        alert('The was an error voting up the post. Try again.')
      })
  }
}

function voteDownComment ({ post }) {
  return {
    type: VOTE_DOWN_COMMENT,
    post,
    option: 'voteDown'
  }
}

export function handleVoteDownComment (info) {
  return (dispatch) => {
    dispatch(voteDownComment(info))

    return voteDownComment(info)
      .catch((e) => {
        console.warn('Error in handleVoteDownComment: ', e)
        //dispatch(voteUpComment(info))  que alerna like
        alert('The was an error voting down the post. Try again.')
      })
  }
}