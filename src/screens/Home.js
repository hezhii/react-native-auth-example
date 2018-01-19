import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { requestWithToken } from '../utils/request';

class Home extends Component {
  state = {};

  componentDidMount() {
    requestWithToken({
      method: 'GET',
      url: '/profile'
    }).then(({ data }) => this.setState({ username: data.username }));
  }

  render() {
    return (
      <View>
        <Text>{this.state.username}, Welcome home!</Text>
      </View>
    );
  }
}

export default Home;
