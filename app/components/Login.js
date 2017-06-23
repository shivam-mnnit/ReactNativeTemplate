/**
 * Created by saionara1 on 6/21/17.
 */
import React, {Component} from "react";
import {StatusBar, Text, View,Image} from "react-native";
import {Button, Container, Content} from "native-base";
import colors from "../resources/colors";
import ValidationTextInput from "./ValidationTextInput";
import consts from "../const";
import dimens from "../resources/dimens";

export default class Login extends Component {
    static navigationOptions = {
        header: null
    };

    //noinspection JSMethodCanBeStatic
    render() {
        return (
            <Container style={loginStyles.containerStyle}>
                <StatusBar style={loginStyles.statusBarStyle}/>
                <Content contentContainerStyle={loginStyles.contentStyle}>
                    <ValidationTextInput
                        validate={(text) => this.validateEmail(text)}
                        label={'Email'}
                        style={loginStyles.emailStyle}
                        color={colors.accentColor}/>
                    <ValidationTextInput
                        validate={(text) => this.validatePassword(text)}
                        label={'Password'}
                        style={loginStyles.emailStyle}
                        color={colors.accentColor}/>

                    <Button
                        style={loginStyles.buttonStyle}>
                        <Text style={loginStyles.buttonTextStyle}>Sign In</Text>
                    </Button>
                </Content>
            </Container>);
    }

    validateEmail(text) {
        return consts.EMAIL_REGEX.test(text);
    }

    validatePassword(text) {
        if (text < consts.MIN_PASSWORD_LENGTH) {
            return false;
        }
        return true;
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
    }
};