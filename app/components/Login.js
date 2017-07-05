/**
 * Created by saionara1 on 6/21/17.
 */
import React, {Component} from "react";
import {Image, StatusBar, Text} from "react-native";
import {Button, Container, Content, Spinner} from "native-base";
import colors from "../resources/colors";
import ValidationTextInput from "./ValidationTextInput";
import {connect} from "react-redux";
import consts from "../const";
import dimens from "../resources/dimens";
import strings from "../resources/strings";
import * as actions from "../actions/action-types";
import styles from "../resources/styles";
import Toast from "react-native-toast";

export class Login extends Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();
    this.password = "";
    this.email = "";
    this.isGoneAlready = false;
  }

  componentDidMount() {
    this.props.dispatch({type: actions.PROGRESS, progress: false})
  }

  componentDidUpdate() {
    const {navigation, login} = this.props;
    const {loginError, isLoggedIn} = login;

    if (loginError && loginError.message) {
      Toast.showShortBottom(this.props.login.loginError.message);
      this.props.dispatch({type: actions.LOGIN_ERROR, error: {}})
    }
    if (isLoggedIn && !this.isGoneAlready) {
      navigation.navigate("RepositoriesList");
      this.isGoneAlready = true;
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
            style={loginStyles.buttonStyle}
            onPress={() => this.onLoginPress()}>
            <Text style={loginStyles.buttonTextStyle}>{strings.sign_in}</Text>
          </Button>
          {this.renderProgress()}
        </Content>
      </Container>);
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

};

function mapStateToProps(state) {
  return {
    login: state.login,
    root: state.root
  }
}

export default connect(mapStateToProps)(Login)