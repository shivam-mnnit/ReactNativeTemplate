/**
 * Created by saionara1 on 6/21/17.
 */
import * as actions from "../actions/action-types";

export default function loginReducer(state, action = {}) {
    switch (action.type) {
        case actions.LOGIN_ERROR:
            console.log('Catch error');
            console.log(action);
            return state.withMutations(state => state
                .set('isLoggedIn', false)
                .set('progress', false)
                .set('loginError', action.error));
        case actions.LOGIN_SUCCESS:
            return state.withMutations(state => state
                .set('isLoggedIn', true)
                .set('progress', false)
                .set('token', action.token.token));
  case actions.LOGOUT_SUCCESS: {
    return {
      ...state,
      progress: false,
      isLoggedIn: false,
      token: '',
      authorizationId: '',
      username: '',
      password: ''
    };
  }
  case actions.LOGOUT_ERROR: {
    return {
      ...state,
      isLoggedIn: true,
      progress: false,
      loginError: action.error
    };
  }
        default:
            return state
    }
}