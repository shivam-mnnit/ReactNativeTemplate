/**
 * Created by saionara1 on 6/29/17.
 */
import * as actions from "../actions/action-types";

const initialState = {
  data: []
};
export default function loginReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.ACTION_LIST_SUCCESS:
      return {
        ...state,
        data: action.page === 1 ? action.list : state.data.concat(action.list)
      };
    default:
      return {
        ...state
      }

  }
}