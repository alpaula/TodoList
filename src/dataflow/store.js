import {
  createStore,
  combineReducers,
} from 'redux';

// Reducers
import Todo from './modules/todo-module';

const reducers = combineReducers({
  todo: Todo,
});

const configureStore = (initialState) => {
  const store = createStore(reducers, initialState);
  return store;
}

export default configureStore({});
