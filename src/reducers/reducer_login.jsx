const CST = require('../shared/constants');

// import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, TOKEN_SUCCESS } from '../actions/index'

const INITIAL_STATE = { auth: null, user: null, error: null, token: null }

export default function(state = INITIAL_STATE, action) {

  switch(action.type){
    case CST.LOGIN_SUCCESS:
      return { ...state, auth: true, user: action.payload.data }
    case CST.LOGIN_FAILURE:
      return { ...state, error: action.payload.data.message }
    case CST.TOKEN_SUCCESS:
      return { ...state, token: action.payload.data.token }
    default:
      return state;
  }
}
