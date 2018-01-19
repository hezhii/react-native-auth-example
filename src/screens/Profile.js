import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

import Button from '../components/Button';
import navigationUtil from '../utils/navigation';
import { removeTokens } from '../utils/storage';
import { requestWithToken } from '../utils/request';

class Profile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={this.logout}
        >
          退出登录
        </Button>
      </View>
    );
  }

  logout = () => {
    requestWithToken({
      method: 'GET',
      url: '/logout'
    });
    removeTokens();
    navigationUtil.reset(this.props.navigation, 'Login');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16
  }
});

export default Profile;
