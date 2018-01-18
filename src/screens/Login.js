import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Alert
} from 'react-native';

import Button from '../components/Button';
import TextButton from '../components/TextButton';
import TextField from '../components/TextField';
import request from '../utils/request';
import navigationUtil from '../utils/navigation';
import { saveToken } from '../utils/storage';

class Login extends Component {
  state = {};

  render() {
    const { navigation } = this.props;
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
          isDisabled={!username || !password}
          onPress={this.login}
        >登录</Button>
        <View style={styles.textBtnContainer}>
          <TextButton
            onPress={() => navigation.navigate('Register')}
          >新用户注册</TextButton>
          <TextButton>忘记密码？</TextButton>
        </View>
      </View>
    );
  }

  login = () => {
    const { username, password } = this.state;
    const self = this;
    request({
      method: 'POST',
      url: '/login',
      data: { username, password }
    })
      .then((data) => {
        console.log('登录成功：' + JSON.stringify(data));
        saveToken(data.data);
        navigationUtil.reset(self.props.navigation, 'Main');
      })
      .catch(err => {
        Alert.alert('登录失败', err.message || err);
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

export default Login;
