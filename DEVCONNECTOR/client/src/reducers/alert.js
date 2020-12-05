/* eslint-disable import/no-anonymous-default-export */
import {SET_ALERT, REMOVE_ALERT} from '../actions/types'

const initialState = []

//action include the new data, nad will be updated to initialState
export default function(state = initialState, action){
  const {type, payload} = action//comes from action/alert.js

  switch(type) {
    case SET_ALERT:
       return [...state, payload]//update the state with new payload
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload)//return all alert except with the payload alert
    default:
      return state
  }
}