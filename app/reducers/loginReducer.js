/**
 * Created by saionara1 on 6/21/17.
 */
import * as actions from "../actions/action-types";

const initialState = {
  isLoggedIn: false,
  user: {},
  loginError: {},
  progress: false
};
export default function loginReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.PROGRESS:
      return {
        ...state,
        progress: action.progress
      };
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
      console.log("Login Sucess");
      return {
        ...state,
        progress: false,
        isLoggedIn: true,
        user: action.user
      };
    }
    default:
      return state;
  }
}