import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';

class TextButton extends Component {
  render() {
    const { children } = this.props;
    return (
      <TouchableOpacity>
        <Text style={styles.buttonText}>{children}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonText: {
    color: '#1890ff'
  }
});

export default TextButton;
