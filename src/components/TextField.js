import React, { Component } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet
} from 'react-native';

export default class TextField extends Component {
  render() {
    const { label, placeholder, type, onChange } = this.props;
    return (
      <View style={styles.textField}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          autoCapitalize='none'
          autoCorrect={false}
          blurOnSubmit={true}
          style={styles.edit}
          placeholder={placeholder}
          secureTextEntry={type === 'password'}
          keyboardType='ascii-capable'
          selectTextOnFocus={false}
          onChangeText={onChange}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textField: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  label: {
    fontSize: 17,
    width: 85,
    paddingVertical: 2
  },
  edit: {
    flex: 1,
    fontSize: 17,
    height: 30
  }
});
