import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

import TextButton from '../components/TextButton';
import TextField from '../components/TextField';

const Button = require('apsl-react-native-button');

class Login extends Component {
  state = {};

  render() {
    const { username, password } = this.state;
    return (
      <View style={styles.container}>
        <TextField
          label='账号'
          placeholder='用户名'
          onChange={value => this.setState({ username: value })}
        />
        <TextField
          label='密码'
          type='password'
          placeholder='请输入登录密码'
          onChange={value => this.setState({ password: value })}
        />
        <Button
          style={styles.button}
          textStyle={styles.buttonText}
          isDisabled={!username || !password}
        >登录</Button>
        <View style={styles.textBtnContainer}>
          <TextButton>新用户注册</TextButton>
          <TextButton>忘记密码？</TextButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff'
  },
  button: {
    marginVertical: 16,
    backgroundColor: '#1890ff',
    borderRadius: 5,
    borderWidth: 0
  },
  buttonText: {
    color: '#fff',
    fontSize: 16
  },
  textBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default Login;
