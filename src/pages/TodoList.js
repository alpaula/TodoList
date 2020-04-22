import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image,
} from 'react-native';

// Image
import checkIcon from '../assets/check.png';
import checkGrayIcon from '../assets/check-gray.png'
import deleteIcon from '../assets/clear.png';

class ListItems extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    const  { todoList } = this.props;

    return (
      <View style={styles.containerList}>
        {todoList.map((todo) => {
          const handleDeleteTodo = () => {
            this.props.handleDeleteTodo(todo.id);
          }

          const handleChecked = () => {
            this.props.handleChecked(todo);
          }

          return (
            <View
              key={todo.id}
              style={styles.itemList}
            >
              <TouchableHighlight
                style={styles.itemListCheck}
                onPress={handleChecked}
                underlayColor='transparent'
              >
                {<Image style={{ width: 11, height: 11 }} source={todo.isChecked ? checkIcon : checkGrayIcon} />}
              </TouchableHighlight>
              <Text style={styles.itemListText}>{todo.text}</Text>
              <TouchableHighlight
                style={styles.itemListButton}
                underlayColor='#dedede'
                onPress={handleDeleteTodo}
              >
                <Image style={{ width: 11, height: 11 }} source={deleteIcon} />
              </TouchableHighlight>
            </View>
          )}
        )}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  containerList: {
    height: 'auto'
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

export default ListItems;