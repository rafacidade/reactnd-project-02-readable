export const SET_DATA_LOADED = 'SET_DATA_LOADED'

export function setDataLoaded () {
  return {
    type: SET_DATA_LOADED,
    dataLoaded: true,
  }
}