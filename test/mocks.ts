import { Todo } from "src/app/models/todo"
import { State } from "src/app/store/reducer"

export abstract class MockDatas {
  static get initialState(): State {
    return {
      todos: [
        { id: 1, title: 'todo 1', isClosed: false, details: 'More details about todo 1', creationDate: new Date('2023-09-13T11:00:00') },
        { id: 2, title: 'todo 2', isClosed: true, details: 'More details about todo 2', creationDate: new Date('2023-09-13T11:00:00'), closingDate: new Date('2023-09-13T11:20:00') },
      ],
      selectedTodo: undefined
    }
  };

  static get todoNotClosed(){ return { id: 0, title: 'todo not closed', isClosed: false, details: 'More details about not closed', creationDate: new Date('2023-09-13T11:26:00') }};
  static get todo1(): Todo { return { id: 1, title: 'todo 1', isClosed: true, details: 'More details about todo 1', creationDate: new Date('2023-09-13T11:20:00'), closingDate: new Date('2023-09-13T11:15:00') }};
  static get todo2(): Todo { return { id: 2, title: 'todo 2', isClosed: false, details: 'More details about todo 2', creationDate: new Date('2023-09-13T11:11:00') }};
  static get todo3(): Todo { return { id: 3, title: 'todo 3', isClosed: true, details: 'More details about todo 3', creationDate: new Date('2023-09-13T11:08:00'), closingDate: new Date('2023-09-13T11:20:00') }};
  static get todo4(): Todo { return { id: 4, title: 'todo 4', isClosed: false, details: 'More details about todo 4', creationDate: new Date('2023-09-13T11:00:00') }};
}
