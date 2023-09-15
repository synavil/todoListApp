import * as fromReducer from './reducer';
import { State } from './reducer';
import { changeTodoStateSuccess, createNewTodoSuccess, loadSelectedTodoFailed, loadSelectedTodoSuccess, loadTodosFailed, loadTodosSuccess, unloadSelectedTodo } from './actions';
import { MockDatas } from 'test/mocks';
import { Todo } from '../models/todo';

describe('Reducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {
        type: 'Unknown',
      };
      const state = fromReducer.todosReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('loadTodosSuccess action', () => {
    it('should retrieve all todos and update the state', () => {
      const { initialState } = fromReducer;
      const newState: State = MockDatas.initialState;
      const action = loadTodosSuccess({
        todos: [...MockDatas.initialState.todos as Todo[]],
      });

      const state = fromReducer.todosReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('loadSelectedTodoSuccess action', () => {
    it('should retrieve selected todo and update the state', () => {
      const { initialState } = fromReducer;
      const newState: State = {
        ...initialState,
        selectedTodo: MockDatas.todo1,
      };
      const action = loadSelectedTodoSuccess({ todo: MockDatas.todo1 });

      const state = fromReducer.todosReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('loadSelectedTodoFailed action', () => {
    it('should update the state with loadSelectedTodoActionState to FAILED', () => {
      const { initialState } = fromReducer;
      const newState: State = {
        ...initialState,
        selectedTodo: null,
      };
      const action = loadSelectedTodoFailed();

      const state = fromReducer.todosReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('unloadSelectedTodo action', () => {
    it('should update the state with loadSelectedTodoActionState to NEED_TO_BE_RUN and selectedTodo to undefined', () => {
      const { initialState } = fromReducer;
      const newState: State = {
        ...initialState,
        selectedTodo: undefined,
      };
      const action = unloadSelectedTodo();

      const state = fromReducer.todosReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('changeTodoStateSuccess action', () => {
    it('should update the state with the updated todo value', () => {

      const initialState = { ...MockDatas.initialState, todos: [MockDatas.todoNotClosed, MockDatas.todo1] };
      const updatedTodo = {...MockDatas.todoNotClosed, isClosed: true};
      const newState: State = { ...MockDatas.initialState, todos: [MockDatas.todo1, updatedTodo] };
      const action = changeTodoStateSuccess({
        todo: updatedTodo,
      });

      const state = fromReducer.todosReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });

    it('should update the state with the updated todo value when todo list is undefined', () => {

      const initialState = { ...MockDatas.initialState, todos: undefined };
      const updatedTodo = {...MockDatas.todoNotClosed, isClosed: true};
      const newState: State = { ...MockDatas.initialState, todos: [updatedTodo] };
      const action = changeTodoStateSuccess({
        todo: updatedTodo,
      });

      const state = fromReducer.todosReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('createNewTodoSuccess action', () => {
    it('should update the state with the new todo added at top', () => {

      const initialState = { ...MockDatas.initialState, todos: [MockDatas.todoNotClosed, MockDatas.todo1] };
      const newTodo = MockDatas.todo3;
      const newState: State = { ...MockDatas.initialState, todos: [newTodo, MockDatas.todoNotClosed, MockDatas.todo1] };
      const action = createNewTodoSuccess({
        newTodo: newTodo,
      });

      const state = fromReducer.todosReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });

    it('should update the state with the new todo added at top when todo list is undefined', () => {

      const initialState = { ...MockDatas.initialState, todos: undefined };
      const newTodo = MockDatas.todo3;
      const newState: State = { ...MockDatas.initialState, todos: [newTodo] };
      const action = createNewTodoSuccess({
        newTodo: newTodo,
      });

      const state = fromReducer.todosReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });
});
