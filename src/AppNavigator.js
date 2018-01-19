import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';

import Home from './screens/Home';
import Profile from './screens/Profile';
import Login from './screens/Login';
import Register from './screens/Register';


const Main = TabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerTitle: '主页'
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      headerTitle: '我的'
    }
  }
}, {
  tabBarOptions: {
    labelStyle: {
      fontSize: 16
    }
  }
});

export default function configAppNavigator(isLoggedIn) {
  return StackNavigator({
    Login: {
      screen: Login,
      navigationOptions: {
        headerTitle: '登录'
      }
    },
    Main: {
      screen: Main
    },
    Register: {
      screen: Register,
      navigationOptions: {
        headerTitle: '注册'
      }
    }
  }, {
    initialRouteName: isLoggedIn ? 'Main' : 'Login'
  });
};
