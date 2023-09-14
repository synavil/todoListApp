import {Todo} from '../models/todo';
import {createReducer, on} from '@ngrx/store';
import {changeTodoStateSuccess, loadSelectedTodoFailed, loadSelectedTodoSuccess, loadTodosFailed, loadTodosSuccess, unloadSelectedTodo} from './actions';

export const featureKey = 'todosStore';

export interface State {
  todos: ReadonlyArray<Todo> | undefined;
  selectedTodo: Todo | undefined | null;
}

export const initialState: State = {
  todos: undefined,
  selectedTodo: undefined,
};

export const todosReducer = createReducer(
  initialState,
  on(
    loadTodosSuccess,
    (state, { todos }) => ({
      ...state,
      todos,
    })
  ),
  on(loadSelectedTodoSuccess,
    (state, { todo }) => ({
      ...state,
      selectedTodo: todo,
    })
  ),
  on(loadSelectedTodoFailed,
    (state, _ ) => ({
      ...state,
      selectedTodo: null,
    })
  ),
  on(unloadSelectedTodo,
    (state, _) => ({
      ...state,
      selectedTodo: undefined,
    })
  ),
  on(changeTodoStateSuccess,
    (state, { todo }) => ({
      ...state,
      todos: state.todos
      ? [...state.todos.filter(todoListElement => todoListElement.id !== todo.id), todo]
      : [todo]
    })
  ),
);
