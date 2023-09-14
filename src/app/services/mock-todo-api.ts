import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Todo} from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class MockTodoApi implements InMemoryDbService {

  createDb(): {} {
    const todos: Todo[] = [
      { id: 1, title: 'todo in memory 1', isClosed: false, details: "More details about todo 1. C'est un todo avec beaucoup de text. Enormement de text, qui ne peut pas renter sur une seul ligne." },
      { id: 2, title: 'todo in memory 2', isClosed: false, details: "More details about todo 2" },
      { id: 3, title: 'todo in memory 3', isClosed: true, details: "More details about todo 3" },
      { id: 4, title: 'todo in memory 4', isClosed: false, details: "More details about todo 4" },
    ];
    return { todos };
  }

}
