/**
 * Created by saionara1 on 6/29/17.
 */
import * as actions from "../actions/action-types";

const initialState = {
  progress: false
};
export default function loginReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.PROGRESS:
      return {
        ...state,
        progress: action.progress
      };
    default:
      return state
  }
}
