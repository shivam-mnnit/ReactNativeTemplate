/**
 * Created by saionara1 on 6/21/17.
 */
import * as actions from "../actions/action-types";

const initialState = {
  isLoggedIn: false,
  token: '',
  loginError: {}
};
export default function loginReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.LOGIN_ERROR:
      console.log('Catch error');
      console.log(action);
      return {
        ...state,
        isLoggedIn: false,
        progress: false,
        loginError: action.error
      };
    case actions.LOGIN_SUCCESS: {
      return {
        ...state,
        progress: false,
        isLoggedIn: true,
        token: action.token.token
      };
    }
    default:
      return state;
  }
}