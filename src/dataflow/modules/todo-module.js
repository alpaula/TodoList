//Action types
const ADD_TODO = 'ADD_TODO';
const DELETE_TODO = 'DELETE_TODO';
const CHECKED_TODO = 'CHECKED_TODO';

// Initial state
const initialState = {
  todoList: [],
  todo: ''
};


// Reducers
export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        todoList: [
          action.info,
          ...state.todoList
        ]
      };
    case DELETE_TODO:
      return {
        todoList: state.todoList.filter(item => item.id !== action.info),
      };
    case CHECKED_TODO:
      return {
        todoList: action.info
      };
    default:
      return state;
  }
}

// Actions Create
export const addTodo = (info) => ({
  type: ADD_TODO,
  info
});

export const deleteTodo = (info) => ({
  type: DELETE_TODO,
  info
});

export const checkedTodo = (info) => ({
  type: CHECKED_TODO,
  info
});