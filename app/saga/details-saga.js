/**
 * Created by saionara1 on 7/5/17.
 */
import {call, put, take} from "redux-saga/effects";
import * as actions from "../actions/action-types";
import * as Api from "../api";
import Base64 from "../utils/Base64";


function* getReadMe(token, username, repository) {
  try {
    const readMe = yield call(Api.getReadMe, token, username, repository);
    return readMe;
  } catch (error) {
    yield put({type: actions.ACTION_README_ERROR, error});
  }
}


export function* detailsFlow() {
  while (true) {
    const {token, username, repository} = yield take(actions.ACTION_README);
    yield put({type: actions.PROGRESS, progress: true});
    const readMe = yield  call(getReadMe, token, username, repository);
    yield put({type: actions.PROGRESS, progress: false});
    if (readMe.content) {
      const content = Base64.atob(readMe.content);
      yield put({type: actions.ACTION_README_SUCCESS, readMe: content});
    }
  }
}