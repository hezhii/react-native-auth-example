import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';

import Home from './screens/Home';
import Profile from './screens/Profile';
import Login from './screens/Login';
import Register from './screens/Register';


const Main = TabNavigator({
  Home: {
    screen: Home
  },
  Profile: {
    screen: Profile
  }
});

const AppNavigator = StackNavigator({
  Main: {
    screen: Main
  },
  Login: {
    screen: Login
  },
  Register: {
    screen: Register
  }
});

export default AppNavigator;
