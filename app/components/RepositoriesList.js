/**
 * Created by ihor_kucherenko on 6/28/17.
 */
import React, {Component} from "react";
import {BackHandler, FlatList, View} from "react-native";
import {Container, StyleProvider, Tabs,Spinner} from "native-base";
import RepositoryListItem from "./RepositoryListItem";
import colors from "../resources/colors";
import * as actions from "../actions/action-types";
import material from "../native_theme/variables/material";
import {connect} from "react-redux";
import strings from "../resources/strings";
import getTheme from "../native_theme/components";
import styles from "../resources/styles";

export class RepositoriesList extends Component {

  static navigationOptions = {
    title: strings.list_title,
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
      <StyleProvider style={getTheme(material)}>
        <Container
          shouldRasterizeIOS
          renderToHardwareTextureAndroid
          style={repositoriesListStyles.screenStyle}>
          <Tabs >
            <FlatList
              style={repositoriesListStyles.flatListStyle}
              data={this.props.list.data}
              heading={'Tab1'}
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

            <FlatList
              style={repositoriesListStyles.flatListStyle}
              data={this.props.list.data}
              heading={'Tab2'}
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
            <FlatList
              style={repositoriesListStyles.flatListStyle}
              data={this.props.list.data}
              heading={'Tab3'}
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
          </Tabs>
          {this.renderProgress()}
        </Container>
      </StyleProvider>)
  }

  renderProgress() {
    if (this.props.root.progress) {
      return ( <Spinner
        color={colors.accentColor}
        animating={true}
        size={'large'}
        style={styles.progressStyle}/>)
    } else {
      return null;
    }
  }

}

const repositoriesListStyles = {
  flatListStyle: {},
  screenStyle: {
    flexDirection: 'row',
    justifyContent:'center',
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
    list: state.list,
    root: state.root
  }
}
export default connect(mapStateToProps)(RepositoriesList)