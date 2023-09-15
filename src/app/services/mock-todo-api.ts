import {Injectable} from '@angular/core';
import {InMemoryDbService, RequestInfo} from 'angular-in-memory-web-api';
import {Todo} from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class MockTodoApi implements InMemoryDbService {

  createDb(): {} {
    const todos: Todo[] = [
      { id: 1, title: 'todo in memory 1', isClosed: false, details: "More details about todo 1. C'est un todo avec beaucoup de text. Enormement de text, qui ne peut pas renter sur une seul ligne.", creationDate: new Date('2023-09-13T11:09:00') },
      { id: 2, title: 'todo in memory 2', isClosed: false, details: "More details about todo 2", creationDate: new Date('2023-09-13T11:07:00') },
      { id: 3, title: 'todo in memory 3', isClosed: true, details: "More details about todo 3", creationDate: new Date('2023-09-13T11:05:00'), closingDate: new Date('2023-09-13T18:11:00') },
      { id: 4, title: 'todo in memory 4', isClosed: false, details: "More details about todo 4", creationDate: new Date('2023-09-13T11:02:00') },
    ];
    return { todos };
  }

}
