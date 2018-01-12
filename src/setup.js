import React, { Component } from 'react';

import App from './App';

export default function setup() {
  class Root extends Component {
    render() {
      return (
        <App />
      );
    }
  }

  return Root;
}
