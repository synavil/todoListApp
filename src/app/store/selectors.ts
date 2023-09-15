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
  let compareVal: number;

  if(todoA.isClosed && todoB.isClosed && todoA.closingDate && todoB.closingDate){
    compareVal = new Date(todoA.closingDate).getTime() - new Date(todoB.closingDate).getTime();
  }
  else if(!todoA.isClosed && todoB.isClosed){
    compareVal = -1;
  }
  else if(todoA.isClosed && !todoB.isClosed){
    compareVal = 1;
  }
  else if(!todoA.isClosed && !todoB.isClosed){
    compareVal = new Date(todoB.creationDate).getTime() - new Date(todoA.creationDate).getTime();
  }
  else {
    compareVal = 0;
  }

  return compareVal;
}
