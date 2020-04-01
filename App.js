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

// Components
import Todo from './app/Todo';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Todo />
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
