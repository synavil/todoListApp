import { createAction, props } from '@ngrx/store';
import { Todo } from '../models/todo';

export const loadTodos = createAction('[Todos] Load todos');

export const loadTodosSuccess = createAction(
  '[Todos] Load todos success',
  props<{ todos: Todo[] }>()
);

export const loadTodosFailed = createAction('[Todos] Load todos failed');

export const changeTodoState = createAction('[Todos] Change todo state', props<{ todo: Todo }>());

export const changeTodoStateSuccess = createAction('[Todos] Change todo state success', props<{ todo: Todo }>());

export const changeTodoStateFailed = createAction('[Todos] Change todo state failed');
