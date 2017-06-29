/**
 * Created by saionara1 on 6/22/17.
 */
import {call, put, take} from "redux-saga/effects";
import * as actions from "../actions/action-types";
import * as Api from "../api";

function* authorize(username, password) {
  try {
    const user = yield call(Api.authorize, username, password);
    if (!user.message) {
      yield put({type: actions.LOGIN_SUCCESS, user});
      return user;
    } else {
      console.log(user);
      yield put({type: actions.LOGIN_ERROR, error: user});
      return undefined;
    }
  } catch (error) {
    console.log(error);
    yield put({type: actions.LOGOUT_ERROR, error});
  }
}

export function* loginFlow() {
  while (true) {
    const {username, password} = yield take(actions.LOGIN_ACTION);
    yield put({type: actions.PROGRESS, progress: true});
    const user = yield  call(authorize, username, password);
    if (user) {
      yield take(actions.LOGOUT_ACTION);
    }
  }
}

