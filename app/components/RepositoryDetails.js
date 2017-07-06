/**
 * Created by saionara1 on 7/5/17.
 */
import React, {Component} from "react";
import {Image, Text, View,BackHandler} from "react-native";
import {Container, Content} from "native-base";
import colors from "../resources/colors";
import {connect} from "react-redux";
import * as actions from "../actions/action-types";
import {MarkdownView} from "react-native-markdown-view";

export class RepositoryDetails extends Component {
  static navigationOptions = {
    title: 'Details',
    headerTintColor: 'white',
    headerTitleStyle: {
      color: 'white'
    },
    headerStyle: {
      backgroundColor: colors.primaryColor
    }
  };

  constructor(props) {
    super(props);
    this.params = props.navigation.state.params;
  }

  componentDidMount() {
    this.props.dispatch({
      type: actions.ACTION_README,
      token: this.props.login.token,
      username: this.props.login.user.login,
      repository: this.params.repository.name
    });
  }


  render() {
    return (
      <Container>
        <Content contentContainerStyle={detailsStyles.contentStyle}>
          <View style={detailsStyles.mainInfoStyle}>
            <Image style={detailsStyles.imageStyle} source={{uri: this.params.repository.owner.avatar_url}}/>
            <View style={detailsStyles.textContainer}>
              <Text style={detailsStyles.titleStyle}> {this.params.repository.full_name}</Text>
              <Text style={detailsStyles.descriptionStyle}> {this.params.repository.description}</Text>
            </View>
          </View>
          <Text style={detailsStyles.readMeLabel}>Read Me</Text>
          {this.renderMarkdown()}
        </Content>
      </Container>
    );
  }

  renderMarkdown() {
    if (this.props.details.readMe) {
      return ( <MarkdownView style={detailsStyles.readMeStyle}>
        {this.props.details.readMe}
      </MarkdownView>);
    } else {
      return   <Text style={detailsStyles.descriptionStyle}>No ReadMe</Text>;
    }
  }
}

const detailsStyles = {
  contentStyle: {},
  mainInfoStyle: {
    marginVertical: 8,
    flexDirection: 'row',
    marginHorizontal: 16
  },
  textContainer: {
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginHorizontal: 8
  },
  titleStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 8
  },
  descriptionStyle: {
    fontSize: 14,
    textAlign: 'left',

  },
  imageStyle: {
    width: 100,
    height: 100
  },
  readMeLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8,
    marginLeft: 16
  },
  readMeStyle:{
    marginHorizontal:16,
  }
};


function mapStateToProps(state) {
  return {
    login: state.login,
    list: state.list,
    root: state.root,
    details: state.details
  }
}
export default connect(mapStateToProps)(RepositoryDetails)