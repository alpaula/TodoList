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

// Image
import deleteIcon from '../assets/delete.png';

// Redux
import {
  createTodoList,
  deleteTodoList,
  selectTodoList,
  updateStep,
} from '../dataflow/modules/todo-module';

const mapStateToProps = state => ({
  allTodoLists: state.todo.allTodoLists,
  selectedTodoList: state.todo.selectedTodoList,
});

const mapDispatchToProps = dispatch => ({
  createTodoList: (info) => {
    dispatch(createTodoList(info));
  },
  deleteTodoList: (info) => {
    dispatch(deleteTodoList(info));
  },
  selectTodoList: (info) => {
    dispatch(selectTodoList(info));
  },
  updateStep: (info) => {
    dispatch(updateStep(info));
  },
});

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTodoList: ''
    };
  }

  handleChange = (ev) => {
    const { text } = ev.nativeEvent;

    this.setState({
      newTodoList: text
    });
  }

  handlePress = () => {
    const { newTodoList } = this.state;

    const todoItem = {
      name: newTodoList,
      id: uuidv4(),
      items: [],
    }

    if (newTodoList !== '') {
      this.props.createTodoList(todoItem);
      this.setState({
        newTodoList: ''
      });
    }
  }

  renderAllLists = () => {
    const { allTodoLists } = this.props;

    return (
      <View style={styles.containerList}>
        {allTodoLists.map((list) => {
          const handleDeleteTodoList = () => {
            this.props.deleteTodoList(list.id);
          }

          const handleSelectTodo = () => {
            this.props.selectTodoList(list.id);
            this.props.updateStep('selected-todo');
          }

          return (
            <View
              key={list.id}
              style={styles.itemList}
              onStartShouldSetResponder={handleSelectTodo}
            >
              <Text style={styles.itemListText}>{list.name}</Text>
              <TouchableHighlight
                style={styles.itemListButton}
                underlayColor='#dedede'
                onPress={handleDeleteTodoList}
              >
                <Image style={{ width: 11, height: 11 }} source={deleteIcon} />
              </TouchableHighlight>
            </View>
          )}
        )}
      </View>
    );
  };

  render() {
    const { newTodoList } = this.state;
    console.log(this.props)

    return (
      <View
        style={styles.container}
      >
        <Text style={styles.sectionTitle}>Create new Todo list</Text>
        <View style={styles.containerInput}>
          <TextInput
            style={styles.input}
            value={newTodoList}
            onChange={this.handleChange}
            placeholder='adding a new todo' />
          <TouchableHighlight
            style={styles.addButton}
            underlayColor='#dedede'
            onPress={this.handlePress}
          >
            <Text>Create new todo list</Text>
          </TouchableHighlight>
        </View>
        <Text style={styles.sectionTitle}>Your Todo lists</Text>
        {this.renderAllLists()}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fefefe',
    borderRadius: 10,
    paddingHorizontal: 10
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    height: 50,
    marginTop: 5,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#cecece'
  },

  containerList: {
    height: 'auto',
    marginTop: 15,
  },
  itemList: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    padding: 10,
    backgroundColor: '#ebedee',
    borderRadius: 5,
  },
  itemListText: {
    width: '90%',
    color: '#4f4f4f',
  },
  itemListButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '10%',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);