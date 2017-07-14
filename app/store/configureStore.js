/**
 * Created by saionara1 on 6/21/17.
 */

import { autoRehydrate, persistStore } from 'redux-persist-immutable'
import { combineReducers } from 'redux-immutable';
import createActionBuffer from 'redux-action-buffer'
import {REHYDRATE} from 'redux-persist/constants'
import Immutable from 'immutable';
import { applyMiddleware, compose, createStore } from "redux";
import { AsyncStorage } from "react-native";
import loginReducer from "../reducers/loginReducer";
import rootReducer from "../reducers/rootReducer";
import listReducer from "../reducers/listReduser";
import createSagaMiddleware from "redux-saga";
import * as loginSaga from "../saga/login-saga";
import * as listSaga from "../saga/list-saga";

const combinedReducers = combineReducers({
    root: rootReducer,
    login: loginReducer,
    list: listReducer,
});

const initialState = new Immutable.Map({
    root: Immutable.Map({
        progress: undefined,
    }),
    login: Immutable.Map({
        isLoggedIn: false,
        token: '',
        loginError: {},
    }),
    list: Immutable.Map({
        data: [],
    }),
});

export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        combinedReducers,
        initialState,
        compose(applyMiddleware(sagaMiddleware, createActionBuffer(REHYDRATE)), autoRehydrate({log: true})));

    persistStore(
        store,
        {
            storage: AsyncStorage,
            blacklist: ['root'],
        }
    );
    return {...store, runSaga: [sagaMiddleware.run(loginSaga.loginFlow), sagaMiddleware.run(listSaga.listFlow)]};
}