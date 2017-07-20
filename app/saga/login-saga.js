/**
 * Created by saionara1 on 6/22/17.
 */
import {call, put, take} from "redux-saga/effects";
import * as actions from "../actions/action-types";
import * as Api from "../api";

function* authorize(username, password) {
  try {
    const token = yield call(Api.getAccessToken, username, password);
    if (!token.message) {
      yield put({type: actions.LOGIN_SUCCESS, token, username, password});
      return token;
    } else {
      yield put({type: actions.LOGIN_ERROR, error: token});
      return undefined;
    }
  } catch (error) {
    console.log(error);
    yield put({type: actions.LOGIN_ERROR, error});
  }
}

export function* loginFlow() {
  while (true) {
    const {username, password} = yield take(actions.LOGIN_ACTION);
    yield put({type: actions.PROGRESS, progress: true});
    yield call(authorize, username, password);
    yield put({type: actions.PROGRESS, progress: false});
  }
}


