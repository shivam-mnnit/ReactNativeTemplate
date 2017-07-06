/**
 * Created by saionara1 on 6/21/17.
 */
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {autoRehydrate, persistStore} from "redux-persist";
import {AsyncStorage} from "react-native";
import loginReducer from "../reducers/loginReducer";
import rootReducer from "../reducers/rootReducer";
import listReducer from "../reducers/listReduser";
import detailsReducer from "../reducers/detailsRediucer";
import createSagaMiddleware from "redux-saga";
import * as loginSaga from "../saga/login-saga";
import * as listSaga from "../saga/list-saga";
import * as detailsSaga from "../saga/details-saga";


const combinedReducers = combineReducers({
  root: rootReducer,
  login: loginReducer,
  list: listReducer,
  details: detailsReducer
});

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  store = createStore(combinedReducers, compose(applyMiddleware(sagaMiddleware), autoRehydrate()));
  persistStore(store, {storage: AsyncStorage, blacklist: ['root']});
  return {
    ...store, runSaga: [sagaMiddleware.run(loginSaga.loginFlow),
      sagaMiddleware.run(listSaga.listFlow),
      sagaMiddleware.run(detailsSaga.detailsFlow)]
  };
}