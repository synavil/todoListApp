import {Todo} from '../models/todo';
import {createReducer, on} from '@ngrx/store';
import {changeTodoStateSuccess, loadTodosSuccess} from './actions';

export const featureKey = 'todosStore';

export interface State {
  todos: ReadonlyArray<Todo>;
}

export const initialState: State = {
  todos: [],
};

export const todosReducer = createReducer(
  initialState,
  on(
    loadTodosSuccess,
    (state, { todos }) => ({
      ...state,
      todos
    })
  ),
  on(changeTodoStateSuccess,
    (state, { todo }) => ({
      ...state, todos: [...state.todos.filter(todoListElement => todoListElement.id !== todo.id), todo]
    })
  ),
);
