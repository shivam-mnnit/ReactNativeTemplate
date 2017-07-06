/**
 * Created by saionara1 on 6/21/17.
 */
import React, {Component} from "react";
import {connect, Provider} from "react-redux";
import configureStore from "../store/configureStore.js";
import {StackNavigator} from "react-navigation";
import Login from "./Login";
import RepositoriesList from "./RepositoriesList";

const store = configureStore();
const Routes = {
  Login: {screen: Login},
  RepositoriesList: {screen: RepositoriesList},
};
const Navigator = StackNavigator(Routes, {
  headerMode: 'screen'
});

export class Navigation extends Component {

  render() {
    return (
      <Provider store={store}>
        <Navigator/>
      </Provider>
    );
  }

}

function mapStateToProps(state) {
  return {}
}
function mapDispatchToProps(dispatch) {
  return {}
}
export default connect(
  mapStateToProps,
  mapDispatchToProps)(Navigation);
