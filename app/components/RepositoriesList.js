/**
 * Created by ihor_kucherenko on 6/28/17.
 */
import React, {Component} from "react";
import {BackHandler, FlatList, View} from "react-native";
import RepositoryListItem from "./RepositoryListItem";
import colors from "../resources/colors";
import * as actions from "../actions/action-types";
import {connect} from "react-redux";

export class RepositoriesList extends Component {

  static navigationOptions = {
    title: 'Title',
    headerLeft: null,
    headerTintColor: 'white',
    headerTitleStyle: {
      color: 'white'
    },
    headerStyle: {
      backgroundColor: colors.primaryColor

    }
  };

  _keyExtractor = (item, index) => item.id;

  _renderItem = ({item}) => (
    <RepositoryListItem
      id={item.id}
      title={item.full_name}
      description={item.description}
      navigation={this.props.navigation}
    />
  );

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      BackHandler.exitApp();
    });
    this.props.dispatch({type: actions.ACTION_REPOSITORIES_LIST, username: this.props.login.token, page: 1, limit: 10});
  }

  render() {
    return (
      <View style={repositoriesListStyles.screenStyle}>
        <FlatList
          style={repositoriesListStyles.flatListStyle}
          data={this.props.list.data}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          onEndReached={() => {
            this.props.dispatch({
              type: actions.ACTION_REPOSITORIES_LIST,
              username: this.props.login.token,
              page: 2,
              limit: 10
            });
          }}
          ItemSeparatorComponent={() => <View style={repositoriesListStyles.itemSeparatorStyle}/>}
        />
      </View>)
  }

}

const repositoriesListStyles = {
  flatListStyle: {},
  screenStyle: {
    backgroundColor: colors.primaryColor
  },
  itemSeparatorStyle: {
    flex: 1,
    height: 1,
    backgroundColor: 'grey',
  }
};

function mapStateToProps(state) {
  console.log(state);
  return {
    login: state.login,
    list: state.list
  }
}
export default connect(mapStateToProps)(RepositoriesList)