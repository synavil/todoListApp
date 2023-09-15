import { createAction, props } from '@ngrx/store';
import { Todo } from '../models/todo';

export const loadTodos = createAction('[Todos] Load todos');
export const loadTodosSuccess = createAction(
  '[Todos] Load todos success',
  props<{ todos: Todo[] }>()
);
export const loadTodosFailed = createAction('[Todos] Load todos failed');


export const changeTodoState = createAction(
  '[Todos] Change todo state',
  props<{ todo: Todo }>()
  );
export const changeTodoStateSuccess = createAction(
  '[Todos] Change todo state success',
  props<{ todo: Todo }>()
);
export const changeTodoStateFailed = createAction('[Todos] Change todo state failed');


export const loadSelectedTodo = createAction(
  '[Todos] Load selected todo',
  props<{ todoId: number}>()
);
export const loadSelectedTodoSuccess = createAction(
  '[Todos] Load selected todo success',
  props<{ todo: Todo }>()
);
export const loadSelectedTodoFailed = createAction('[Todos] Load selected todo failed');
export const unloadSelectedTodo = createAction('[Todos] Unload selected todo')

export const createNewTodo = createAction(
  '[Todos] Create a new todo',
  props<{ newTodo: Todo }>()
);
export const createNewTodoSuccess = createAction(
  '[Todos] Create a new todo success',
  props<{ newTodo: Todo }>()
);
export const createNewTodoFailed = createAction('[Todos] Create a new todo failed');
