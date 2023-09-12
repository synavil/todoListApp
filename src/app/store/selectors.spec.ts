import {State} from './reducer';
import {selectTodos} from './selectors';

describe('Selectors', () => {
  it('should select todos list', () => {
    const initialState: State = {
      todos: [
        { id: 1, title: 'todo1Title', isClosed: true},
        { id: 2, title: 'todo2Title', isClosed: false},
      ]
     };
    const expectedTodoList = [
      { id: 2, title: 'todo2Title', isClosed: false},
      { id: 1, title: 'todo1Title', isClosed: true},
    ];

    const result = selectTodos.projector(initialState);
    expect(result).toEqual(expectedTodoList);
  });

  it('should select todos list and sort closed at end', () => {
    const initialState: State = {
      todos: [
        { id: 2, title: 'todo2Title', isClosed: false},
        { id: 4, title: 'todo4Title', isClosed: false},
        { id: 1, title: 'todo1Title', isClosed: true},
        { id: 3, title: 'todo3Title', isClosed: true},
      ]
    };
    const expectedTodoList = [
      { id: 2, title: 'todo2Title', isClosed: false},
      { id: 4, title: 'todo4Title', isClosed: false},
      { id: 1, title: 'todo1Title', isClosed: true},
      { id: 3, title: 'todo3Title', isClosed: true},
    ];

    const result = selectTodos.projector(initialState);
    expect(result).toEqual(expectedTodoList);
  });
});
