import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';

class TextButton extends Component {
  render() {
    const { children, onPress } = this.props;
    return (
      <TouchableOpacity
        onPress={onPress}
      >
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
