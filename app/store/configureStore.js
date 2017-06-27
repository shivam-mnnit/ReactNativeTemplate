/**
 * Created by saionara1 on 6/21/17.
 */
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import sagaMiddleware from "redux-saga";
import {autoRehydrate, persistStore} from "redux-persist";
import {AsyncStorage} from "react-native";
import loginReducer from "../reducers/loginReducer";

const combinedReducers = combineReducers({login: loginReducer});

export default function configureStore() {
    store = createStore(combinedReducers, compose(applyMiddleware(sagaMiddleware), autoRehydrate()));
    persistStore(store, {storage: AsyncStorage, blacklist: []});
    return store;
}