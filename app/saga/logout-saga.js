/**
 * Created by ihor_kucherenko on 7/11/17.
 */
import {call, put, take} from "redux-saga/effects";
import * as actions from "../actions/action-types";
import * as Api from "../api";

function* logOut(authId, username, password) {
  try {
    const result = yield call(Api.logOut, authId, username, password);
    if (!result) {
      yield put({type: actions.LOGOUT_SUCCESS});
    } else {
      yield put({type: actions.LOGOUT_ERROR, error: result.message});
    }
  } catch (error) {
    yield put({type: actions.LOGOUT_ERROR, error});
  }
}

export function* logoutFlow() {
  while (true) {
    const {username, password, authId} = yield take(actions.LOGOUT_ACTION);
    yield put({type: actions.PROGRESS, progress: true});
    yield call(logOut, authId, username, password);
    yield put({type: actions.PROGRESS, progress: false});
  }
}