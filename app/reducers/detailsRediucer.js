/**
 * Created by saionara1 on 7/5/17.
 */
import * as actions from "../actions/action-types";

const initialState = {
  readMe: []
};
export default function detailsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.ACTION_README_SUCCESS:
      return {
        ...state,
        readMe: action.readMe
      };
    default:
      return {
        ...state
      }

  }
}