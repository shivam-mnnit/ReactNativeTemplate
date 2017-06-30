import React, {Component} from "react";
import {Content, Input, Item, Label, Text} from "native-base";
import strings from "../resources/strings";

export default class ValidationTextInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: ""
    };
  }

  render() {
    return (
      <Content
        shouldRasterizeIOS
        renderToHardwareTextureAndroid
        style={this.props.style} scrollEnabled={false}>
        <Item floatingLabel style={{
          borderColor: this.state.error ? 'red' : this.props.color,
          ...validationTextStyles.itemStyle
        }}>
          <Label ellipsizeMode='tail' numberOfLines={1}
                 style={{color: this.props.color}}>{this.props.label}</Label>
          <Input
            style={validationTextStyles.inputStyle}
            secureTextEntry={this.props.secureTextEntry}
            onChangeText={(text) => this.handleTextChange(text)}
            value={this.props.value}
            keyboardType={this.props.type || 'default'}
            onEndEditing={(event) => this.setError(event)}/>
        </Item>
        <Text style={validationTextStyles.errorTextStyle}>{this.state.error } </Text>
      </Content>
    );
  }

  handleTextChange(text) {
    this.setState({error: ""});
    if (this.props.onChangeText) {
      this.props.onChangeText(text);
    }
    if (this.props.validateWhileEdit) {
      this.setError();
    }
  }

  setError(event) {
    if (!this.props.validate(event.nativeEvent.text)) {
      if (!event.nativeEvent.text || event.nativeEvent.text === "") {
        this.setState({error: strings.empty_error});
      } else {
        this.setState({error: this.props.error});
      }
    } else {
      this.setState({error: ""});
    }
  }
}

const validationTextStyles = {
  errorTextStyle: {
    color: 'red'
  },
  itemStyle: {
    flex: 0,
    marginTop: 16
  },
  inputStyle: {
    color: 'white'
  }
};

