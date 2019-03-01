import { SET_DATA_LOADED } from '../actions/dataLoaded'

export default function setDataLoaded (state = false, action) {
  switch (action.type) {
    case SET_DATA_LOADED :
      return action.dataLoaded
    default :
      return state
  }
}