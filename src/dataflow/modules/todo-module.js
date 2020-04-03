//Action types
const ADD_TODO = 'ADD_TODO';

// Initial state
const initialState = {
  todos: [],
  todo: ''
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        todos: [...state.todos, action.info]
      };
    default:
      return state;
  }
}

// Actions
export const addTodo = (info) => ({
  type: ADD_TODO,
  info
});