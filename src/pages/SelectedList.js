import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Image,
} from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

// Component
import TodoList from './TodoList';

// Images
import arrowIcon from '../assets/arrow.png';

// Redux
import {
  addTodo,
  deleteTodo,
  checkedTodo,
  updateStep,
  selectTodoList,
} from '../dataflow/modules/todo-module';

const mapStateToProps = state => ({
  allTodoLists: state.todo.allTodoLists,
  selectedTodoList: state.todo.selectedTodoList
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
  },
  updateStep: (info) => {
    dispatch(updateStep(info));
  },
  selectTodoList: (info) => {
    dispatch(selectTodoList(info));
  },
});

class Dashboard extends Component {
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
    this.props.checkedTodo(todo.id);
  }

  handleBack = () => {
    this.props.updateStep('all-lists');
    this.props.selectTodoList('');
  }

  render() {
    const { selectedTodoList, allTodoLists } = this.props;
    const { newTodo } = this.state;

    const list = allTodoLists.find(item => item.id === selectedTodoList);
    console.log(this.props);

    return (
      <View style={styles.container}>
        <View style={styles.backButton} onStartShouldSetResponder={this.handleBack}>
          <Image style={styles.backButtonIcon} source={arrowIcon} />
          <Text style={styles.backButtonText}>Back</Text>
        </View>
        <Text style={styles.sectionTitle}>{list.name} - Todo list</Text>
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
        <TodoList
          todoList={list.items}
          handleChecked={this.handleChecked}
          handleDeleteTodo={this.handleDeleteTodo}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonIcon: {
    width: 20,
    height: 20,
    marginRight: 4
  },
  backButtonText: {
    color: 'purple'
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
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);