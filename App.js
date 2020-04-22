/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { Provider } from 'react-redux';

import store from './src/dataflow/store';

// Components
import Dashboard from './src/pages/Dashboard';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Provider store={store}>
          <Dashboard />
        </Provider>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default App;
