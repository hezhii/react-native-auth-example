import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Alert
} from 'react-native';

import Button from '../components/Button';
import TextField from '../components/TextField';
import request from '../utils/request';

class Register extends Component {
  state = {};

  render() {
    const { username, password } = this.state;
    return (
      <View style={styles.container}>
        <TextField
          label='用户名'
          placeholder='请设置用户名'
          onChange={value => this.setState({ username: value })}
        />
        <TextField
          label='密码'
          type='password'
          placeholder='请设置密码'
          onChange={value => this.setState({ password: value })}
        />
        <Button
          isDisabled={!username || !password}
          onPress={this.register}
        >注册</Button>
      </View>
    );
  }

  register = () => {
    const { username, password } = this.state;
    const self = this;
    request({
      method: 'POST',
      url: '/register',
      data: { username, password }
    })
      .then(() => {
        Alert.alert('注册成功');
      })
      .catch(err => {
        Alert.alert('注册失败', err.message || err);
      });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff'
  },
  textBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default Register;
