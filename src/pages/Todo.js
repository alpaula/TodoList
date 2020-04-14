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
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

// Component
import ListItem from './TodoList';

// Redux
import {
  addTodo,
  deleteTodo,
  checkedTodo,
} from '../dataflow/modules/todo-module';

const mapStateToProps = state => ({
  todoList: state.todo.todoList
});

const mapDispatchToProps = dispatch => ({
  addTodo: (info) => {
    dispatch(addTodo(info));
  },
  deleteTodo: (info) => {
    dispatch(deleteTodo(info));
  },
  checkedTodo: (info) => {
    dispatch(checkedTodo(info));
  }
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

    const todoItem = {
      text: newTodo,
      id: uuidv4(),
      isChecked: false
    }

    if (newTodo !== '') {
      this.props.addTodo(todoItem);
      this.setState({
        newTodo: ''
      });
    }
  }

  handleDeleteTodo = (item) => {
    this.props.deleteTodo(item);
  }

  handleChecked = (todo) => {
    const { todoList } = this.props;

    const newList = todoList.map(item => {
      if (item.id === todo.id) {
        return {
          ...item,
          isChecked: !item.isChecked
        }
      } else {
        return item
      }
    });

    this.props.checkedTodo(newList);
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
        <ListItem
          todoList={this.props.todoList}
          handleChecked={this.handleChecked}
          handleDeleteTodo={this.handleDeleteTodo}
        />
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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    padding: 6,
    backgroundColor: '#ebedee',
    borderRadius: 5,
  },
  itemListCheck: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
    height: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 	'#31303a',
    borderStyle: 'solid',
    borderRadius: 4,
  },
  itemListText: {
    width: '80%',
    color: '#4f4f4f',
  },
  itemListButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '10%',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);