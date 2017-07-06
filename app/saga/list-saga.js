/**
 * Created by saionara1 on 6/29/17.
 */
import {call, put, take} from "redux-saga/effects";
import * as actions from "../actions/action-types";
import * as Api from "../api";


function* getList(username, page, limit) {
  try {
    const list = yield call(Api.getRepositories, username, page, limit);
    return list;
  } catch (error) {
    yield put({type: actions.ACTION_LIST_ERROR, error});
  }
}

export function* listFlow() {
  while (true) {
    const {username, page, limit} = yield take(actions.ACTION_REPOSITORIES_LIST);
    yield put({type: actions.PROGRESS, progress: true});
    const list = yield  call(getList, username, page, limit);
    yield put({type: actions.PROGRESS, progress: false});
    yield put({type: actions.ACTION_LIST_SUCCESS, list: list, page: page});
  }
}