/**
 * Created by saionara1 on 6/21/17.
 */
import React, {Component} from "react";
import {Image, StatusBar, Text} from "react-native";
import {Button, Container, Content} from "native-base";
import colors from "../resources/colors";
import ValidationTextInput from "./ValidationTextInput";
import consts from "../const";
import dimens from "../resources/dimens";
import strings from "../resources/strings";

export default class Login extends Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();
    this.password = "";
    this.email = "";
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
        </Content>
      </Container>);
  }

  validateEmail(text) {
    return consts.EMAIL_REGEX.test(text);
  }

  validatePassword(text) {
    return text >= consts.MIN_PASSWORD_LENGTH;

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
