import { RECEIVE_POSTS, ADD_POST, DELETE_POST, EDIT_POST, VOTE_UP_POST, VOTE_DOWN_POST, INCREMENT_COMMENT_COUNTER } from '../actions/posts'

export default function posts (state = {}, action) {
  switch(action.type) {
    case RECEIVE_POSTS :
      //Reduce function to define keys
      const posts = action.posts.reduce((accumulator, currentValue) => {
        accumulator[currentValue.id] = currentValue;
        return accumulator;
      }, {})

      return {
        ...state,
        ...posts,
      }
    case ADD_POST :
      return {
        ...state,
        [action.post.id]: action.post,
      }
    case DELETE_POST :
      delete state[action.post.id]

      return {
        ...state
      }
  	case EDIT_POST :
      return {
        ...state,
        [action.post.id]: action.post
      }
    case VOTE_UP_POST :
      return {
        ...state,
        [action.post.id]: action.post
      }
    case VOTE_DOWN_POST :
      return {
        ...state,
        [action.post.id]: action.post
      }
    case INCREMENT_COMMENT_COUNTER :
      const commentCount = state[action.parentId].commentCount + action.incrementValue
      const post = {
        ...state[action.parentId],
        commentCount
      }
      return {
        ...state,
        [action.parentId]: post
      }
    default :
      return state
  }
}