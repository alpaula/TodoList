import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  ScrollView,
} from 'react-native';

const mapStateToProps = state => ({
  step: state.todo.step
});

// Component
import SelectedList from './SelectedList';
import CreateTodoList from './CreateTodoList';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { step } = this.props;

    return (
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
      >
        {step === 'all-lists' && <CreateTodoList />}
        {step === 'selected-todo' && <SelectedList />}
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    padding: 50,
  }
});

export default connect(mapStateToProps, null)(Dashboard);