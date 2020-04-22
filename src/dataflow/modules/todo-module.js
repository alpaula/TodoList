//Action types
const CREATE_TODO_LIST = 'CREATE_TODO_LIST';
const DELETE_TODO_LIST = 'DELETE_TODO_LIST';
const SELECT_TODO_LIST = 'SELECT_TODO_LIST';
const ADD_TODO = 'ADD_TODO';
const DELETE_TODO = 'DELETE_TODO';
const CHECKED_TODO = 'CHECKED_TODO';
const UPDATE_STEP = 'UPDATE_STEP';

// Initial state
const initialState = {
  allTodoLists: [],
  selectedTodoList: {},
  step: 'all-lists'
};


// Reducers
export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_TODO_LIST:
      return {
        ...state,
        allTodoLists: [
          ...state.allTodoLists,
          action.info,
        ],
      };
    case DELETE_TODO_LIST:
      return {
        ...state,
        allTodoLists: state.allTodoLists.filter(list => list.id !== action.info),
      };
    case SELECT_TODO_LIST:
      return {
        ...state,
        selectedTodoList: action.info,
      };
    case ADD_TODO:
      return {
        ...state,
        allTodoLists: state.allTodoLists.map(list => {
          if(list.id === state.selectedTodoList) {
            return {
              ...list,
              items: [
                ...list.items,
                action.info
              ]
            };
          } else {
            return list;
          }
        })
      };
    case DELETE_TODO:
      return {
        ...state,
        allTodoLists: state.allTodoLists.map(list => {
          if(list.id === state.selectedTodoList) {
            return {
              ...list,
              items: list.items.filter(item => item.id !== action.info)
            };
          } else {
            return list;
          }
        })
      };
    case CHECKED_TODO:
      return {
        ...state,
        allTodoLists: state.allTodoLists.map(list => {
          if(list.id === state.selectedTodoList) {
            return {
              ...list,
              items: list.items.map(item => {
                if (item.id === action.info) {
                  return {
                    ...item,
                    isChecked: !item.isChecked
                  }
                } else {
                  return item
                }
              })
            };
          } else {
            return list;
          }
        })
      };
    case UPDATE_STEP:
      return {
        ...state,
        step: action.info,
      }
    default:
      return state;
  }
}

// Actions Create
export const createTodoList = (info) => ({
  type: CREATE_TODO_LIST,
  info
});

export const deleteTodoList = (info) => ({
  type: DELETE_TODO_LIST,
  info
});

export const selectTodoList = (info) => ({
  type: SELECT_TODO_LIST,
  info
});

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

export const updateStep = (info) => ({
  type: UPDATE_STEP,
  info
});