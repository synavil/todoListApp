import {createFeatureSelector, createSelector} from '@ngrx/store';
import {featureKey, State} from './reducer';
import { Todo } from '../models/todo';

export const getState = createFeatureSelector<State>(featureKey);

export const selectTodos = createSelector(
  getState,
  (state: State) => state.todos ? [...state.todos].sort(compareTodoByClosedState) : undefined,
);

export const selectSelectedTodo = createSelector(
  getState,
  (state: State) => state.selectedTodo,
);

function compareTodoByClosedState(todoA: Todo, todoB: Todo): number {
  return ((todoA.isClosed ? 1 : 0) - (todoB.isClosed ? 1 : 0));

}
