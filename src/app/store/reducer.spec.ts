import * as fromReducer from './reducer';
import { State } from './reducer';
import { changeTodoStateSuccess, loadTodosSuccess } from './actions';

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
      const newState: State = { todos: [{ id: 1, title: 'aTitle', isClosed: false }] };
      const action = loadTodosSuccess({
        todos: [...newState.todos],
      });

      const state = fromReducer.todosReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('changeTodoStateSuccess action', () => {
    it('should update the state with the updated todo value', () => {
      const initialState = { todos: [{ id: 1, title: 'aTitle1', isClosed: false }, { id: 2, title: 'aTitle2', isClosed: false }] };
      const newState: State = { todos: [{ id: 2, title: 'aTitle2', isClosed: false }, { id: 1, title: 'aTitle1', isClosed: true }] };
      const action = changeTodoStateSuccess({
        todo: { id: 1, title: 'aTitle1', isClosed: true },
      });

      const state = fromReducer.todosReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });
});
