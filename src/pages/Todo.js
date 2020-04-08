import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableHighlight,
} from 'react-native';

import { addTodo } from '../dataflow/modules/todo-module';

const mapStateToProps = state => ({
  todoList: state.todo.todoList
});

const mapDispatchToProps = dispatch => ({
  addTodo: (info) => {
    dispatch(addTodo(info));
  },
});

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTodo: ''
    };
  }

  handleChange = (ev) => {
    const { text } = ev.nativeEvent;

    this.setState({
      newTodo: text
    });
  }

  handlePress = () => {
    const { newTodo } = this.state;

    if (newTodo !== '') {
      this.props.addTodo(newTodo);
      this.setState({
        newTodo: ''
      });
    }
  }

  renderTodoList = () => {
    const  { todoList } = this.props;

    return (
      <View style={styles.containerList}>
        {todoList.map((todo, i) => (
          <Text key={i} style={styles.itemList}>{todo}</Text>
        ))}
      </View>
    );
  }

  render() {
    const { newTodo } = this.state;

    return (
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
      >
        <Text style={styles.sectionTitle}>Todo list</Text>
        <View style={styles.containerInput}>
          <TextInput
            style={styles.input}
            value={newTodo}
            onChange={this.handleChange}
            placeholder='adding a new todo' />
          <TouchableHighlight
            style={styles.addButton}
            underlayColor='#dedede'
            onPress={this.handlePress}
          >
            <Text>Add</Text>
          </TouchableHighlight>
        </View>
        {this.renderTodoList()}
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    padding: 50,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: 'purple',
    textDecorationLine: 'underline',
    textDecorationStyle: 'dashed',
    textDecorationColor: 'purple',
    textAlign: 'center'
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 50,
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    width: '80%',
    height: '100%',
    backgroundColor: '#fefefe',
    borderRadius: 10,
    paddingHorizontal: 10
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '18%',
    height: '100%',
    borderRadius: 5,
    backgroundColor: '#cecece'
  },
  containerList: {
    height: 'auto'
  },
  itemList: {
    color: '#4f4f4f'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);