import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { requestWithToken } from '../utils/request';
import Button from '../components/Button';

class Home extends Component {
  state = {
    errorMsg: null
  };

  componentDidMount() {
    this.getProfile();
  }

  getProfile = () => {
    requestWithToken({
      method: 'GET',
      url: '/profile'
    })
      .then(({ data }) => this.setState({ username: data.username }))
      .catch(err => {
        console.log(err);
        this.setState({ errorMsg: '获取用户信息出错！' });
      });
  };

  render() {
    const { errorMsg, username } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {errorMsg ? errorMsg : username + ', Welcome home!'}
        </Text>
        <Button
          onPress={this.getProfile}
        >刷新</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18
  },
  text: {
    marginTop: 8,
    fontSize: 20
  }
});

export default Home;
