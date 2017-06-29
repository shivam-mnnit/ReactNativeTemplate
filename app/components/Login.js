/**
 * Created by saionara1 on 6/21/17.
 */
import React, {Component} from "react";
import {ActivityIndicator, Image, StatusBar, Text} from "react-native";
import {Button, Container, Content} from "native-base";
import colors from "../resources/colors";
import ValidationTextInput from "./ValidationTextInput";
import {connect} from "react-redux";
import consts from "../const";
import dimens from "../resources/dimens";
import strings from "../resources/strings";
import * as actions from "../actions/action-types";
var Toast = require('react-native-toast');

export class Login extends Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();
    this.password = "";
    this.email = "";
  }

  componentDidMount() {
    this.props.dispatch({type: actions.PROGRESS, progress: false})
  }

  componentDidUpdate() {
    if (this.props.login.loginError.message) {
      Toast.showShortBottom(this.props.login.loginError.message);
      this.props.dispatch({type: actions.LOGIN_ERROR, error: {}})
    }
  }

  //noinspection JSMethodCanBeStatic
  render() {
    return (
      <Container style={loginStyles.containerStyle}>
        <StatusBar style={loginStyles.statusBarStyle}/>
        <Content contentContainerStyle={loginStyles.contentStyle}>
          <Image style={loginStyles.imageStyle} source={{uri: 'ic_yalantis'}}/>
          <ValidationTextInput
            validate={(text) => this.validateEmail(text)}
            label={strings.github_email}
            onChangeText={(text) => this.email = text}
            style={loginStyles.emailStyle}
            color={colors.accentColor}/>
          <ValidationTextInput
            validate={(text) => this.validatePassword(text)}
            onChangeText={(text) => this.password = text}
            label={strings.password}
            style={loginStyles.emailStyle}
            color={colors.accentColor}/>

          <Button
            style={loginStyles.buttonStyle}>
            <Text style={loginStyles.buttonTextStyle}>{strings.sign_in}</Text>
          </Button>
          {this.renderProgress()}
        </Content>
      </Container>);
  }

  renderProgress() {
    if (this.props.login.progress) {
      return ( <ActivityIndicator
        color={colors.accentColor}
        animating={true}
        size={46}
        style={loginStyles.progressStyle}/>)
    } else {
      return null;
    }
  }

  validateEmail(text) {
    return consts.EMAIL_REGEX.test(text);
  }

  validatePassword(text) {
    return text >= consts.MIN_PASSWORD_LENGTH;

  }

  onLoginPress() {
    this.props.dispatch({type: actions.LOGIN_ACTION, username: this.email, password: this.password})
  }
}


const loginStyles = {
  containerStyle: {
    flexDirection: 'row',
    backgroundColor: colors.primaryColor,
    alignItems: 'center'
  },
  contentStyle: {
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginHorizontal: dimens.margin_large
  },
  statusBarStyle: {
    backgroundColor: colors.primaryColor
  },
  emailStyle: {
    alignSelf: 'stretch',
  },
  buttonStyle: {
    marginTop: dimens.margin_medium,
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: colors.accentColor
  },
  buttonTextStyle: {
    color: 'white',
    fontSize: dimens.text_size_button
  },
  imageStyle: {
    width: 150,
    height: 150,
  },
  progressStyle: {
    alignSelf: 'center',
    position: 'absolute',
  }
};

function mapStateToProps(state) {
  console.log(state);
  return {login: state.login}
}

export default connect(mapStateToProps)(Login)