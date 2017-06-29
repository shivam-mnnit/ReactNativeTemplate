/**
 * Created by ihor_kucherenko on 6/28/17.
 */
import React, {Component} from "react";
import {FlatList, View} from "react-native";
import RepositoryListItem from "./RepositoryListItem";

export default class RepositoriesList extends Component {

  static navigationOptions = {
    //title: strings.listTitle
  };

  _keyExtractor = (item, index) => item.id;

  _renderItem = ({item}) => (
    <RepositoryListItem
      id={item.id}
      title={item.title}
      description={item.description}
      navigation={this.props.navigation}
    />
  );

  render() {
    return (
      <View style={repositoriesListStyles.screenStyle}>
        <FlatList
          style={repositoriesListStyles.flatListStyle}
          //data={this.props.data}
          data={[
            {id: 0, title: "title0", description: "description"},
            {id: 1, title: "title1", description: "description"},
            {id: 2, title: "title2", description: "description"},
            {id: 3, title: "title3", description: "description"},
            {id: 4, title: "title4", description: "description"},
            {id: 5, title: "title5", description: "description"},
            {id: 6, title: "title6", description: "description"},
            {id: 7, title: "title7", description: "description"}
          ]}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          ItemSeparatorComponent={() => <View style={repositoriesListStyles.itemSeparatorStyle}/>}
        />
      </View>)
  }

}

const repositoriesListStyles = {
  flatListStyle: {},
  screenStyle: {
    backgroundColor: 'white'
  },
  itemSeparatorStyle: {
    flex: 1,
    height: 4,
    backgroundColor: 'white',
  }
};