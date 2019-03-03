import { GET_POST_COMMENTS, ADD_COMMENT, DELETE_COMMENT, EDIT_COMMENT, VOTE_UP_COMMENT, VOTE_DOWN_COMMENT, GET_COMMENT } from '../actions/comments'

export default function comments (state = {}, action) {
  switch(action.type) {
    case GET_POST_COMMENTS :
      const comments = action.comments.reduce((accumulator, currentValue) => {
        accumulator[currentValue.id] = currentValue;
        return accumulator;
      }, {})

      return {
        ...comments,
      }
    case ADD_COMMENT :
      return {
        ...state,
        [action.comment.id]: action.comment
      }
    case DELETE_COMMENT :
      delete state[action.comment.id]
      return {
        ...state,
      }
    case EDIT_COMMENT :
      return {
        ...state,
        [action.comment.id]: action.comment
      }
  	case VOTE_UP_COMMENT :
      return {
        ...state,
        [action.comment.id]: action.comment
      }
    case VOTE_DOWN_COMMENT :
      return {
        ...state,
        [action.comment.id]: action.comment
      }
    case GET_COMMENT :
      return {
        ...state,
        [action.comment.id]: action.comment
      }
    default :
      return state
  }
}