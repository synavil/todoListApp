export abstract class MockDatas {
  static get initialState() {
    return {
      todos: [
        { id: 1, title: 'todo 1', isClosed: false, details: 'More details about todo 1' },
        { id: 2, title: 'todo 2', isClosed: true, details: 'More details about todo 2' },
      ],
      selectedTodo: undefined
    }
  };

  static get todoNotClosed(){ return { id: 0, title: 'todo not closed', isClosed: false, details: 'More details about not closed' }};
  static get todo1(){ return { id: 1, title: 'todo 1', isClosed: true, details: 'More details about todo 1' }};
  static get todo2(){ return { id: 2, title: 'todo 2', isClosed: false, details: 'More details about todo 2' }};
  static get todo3(){ return { id: 3, title: 'todo 3', isClosed: true, details: 'More details about todo 3' }};
  static get todo4(){ return { id: 4, title: 'todo 4', isClosed: false, details: 'More details about todo 4' }};
}
