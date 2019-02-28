import { GET_POST_COMMENTS, ADD_COMMENT, DELETE_COMMENT, EDIT_COMMENT, VOTE_UP_COMMENT, VOTE_DOWN_COMMENT, GET_POST_COMMENTS } from '../actions/comments'

export default function comments (state = {}, action) {
  switch(action.type) {
    case GET_POST_COMMENTS :
      return {
        ...state,        
        comments: action.comments,
        post: action.post,
      }
    case ADD_COMMENT :
      return {
        ...state,
        [action.comment.id]: action.comment
      }
  	case DELETE_COMMENT :
      return {
        ...state,
        [action.comment.id]: action.comment
      }
    case EDIT_COMMENT :
      return {
        ...state,
        [action.comment.id]: action.comment
      }
  	case VOTE_UP_COMMENT :
      return {
        ...state
      }
    case VOTE_DOWN_COMMENT :
      return {
        ...state
      }    
    default :
      return state
  }
}