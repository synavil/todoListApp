import { MockDatas } from 'test/mocks';
import {State} from './reducer';
import {selectSelectedTodo, selectTodos} from './selectors';

describe('Selectors', () => {
  describe('selectTodos selector', () => {
    it('should select todos list', () => {
      const initialState: State = MockDatas.initialState
      const expectedTodoList = [...MockDatas.initialState.todos];

      const result = selectTodos.projector(initialState);
      expect(result).toEqual(expectedTodoList);
    });

    it('should retreive undefine when todos not loaded', () => {
      const initialState: State = { ...MockDatas.initialState, todos: undefined }
      const expectedTodoList = undefined;

      const result = selectTodos.projector(initialState);
      expect(result).toEqual(expectedTodoList);
    });

    it('should select todos list and sort closed at end', () => {
      const initialState: State = {
        ...MockDatas.initialState,
        todos: [MockDatas.todo1, MockDatas.todo2, MockDatas.todo3, MockDatas.todo4]
      };
      const expectedTodoList = [MockDatas.todo2, MockDatas.todo4, MockDatas.todo1, MockDatas.todo3];

      const result = selectTodos.projector(initialState);
      expect(result).toEqual(expectedTodoList);
    });
  });

  describe('selectSelectedTodo  selector', () => {
    it('should select selected todo ', () => {
      const selectedTodo = MockDatas.todo1;
      const initialState: State = { ...MockDatas.initialState, selectedTodo: selectedTodo }

      const result = selectSelectedTodo.projector(initialState);
      expect(result).toEqual(selectedTodo);
    });
  });
});
