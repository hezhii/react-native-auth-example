import React, { Component } from 'react';
import {
  StyleSheet
} from 'react-native';

const APSLButton = require('apsl-react-native-button');

export default class Button extends Component {
  render() {
    const { style, textStyle, children } = this.props;
    return (
      <APSLButton
        {...this.props}
        style={[styles.button, style]}
        textStyle={[styles.buttonText, textStyle]}
      >{children}</APSLButton>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 16,
    backgroundColor: '#1890ff',
    borderRadius: 5,
    borderWidth: 0
  },
  buttonText: {
    color: '#fff',
    fontSize: 16
  }
});
