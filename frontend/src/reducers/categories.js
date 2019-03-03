import { RECEIVE_CATEGORIES } from '../actions/categories'

export default function categories (state = {}, action) {
  switch(action.type) {
    case RECEIVE_CATEGORIES :
      //Reduce function to define correct keys
      const categories = action.categories.reduce((accumulator, currentValue) => {
        accumulator[currentValue.path] = currentValue;
        return accumulator;
      }, {})
      return {
        ...state,
        ...categories
      }
    default :
      return state
  }
}