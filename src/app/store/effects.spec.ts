import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { Effects } from './effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { Actions } from '@ngrx/effects';
import { todosReducer } from './reducer';
import { TodoService } from '../services/todo.service';
import { cold, hot } from 'jasmine-marbles';
import {changeTodoState, changeTodoStateFailed, changeTodoStateSuccess, loadTodos, loadTodosFailed, loadTodosSuccess} from './actions';
import { Todo } from '../models/todo';

describe('Effects', () => {
  let effects: Effects;
  let actions: Observable<Actions>;
  const todoService = jasmine.createSpyObj<TodoService>('TodoService', ['list', 'update']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({ todosStore: todosReducer })],
      providers: [
        Effects,
        provideMockActions(() => actions),
        {
          provide: TodoService,
          useValue: todoService,
        },
      ],
    });

    effects = TestBed.inject(Effects);
  });

  describe('loadTodos$', () => {
    it('should dispatch loadTodosSuccess action when todoService.list return a result', () => {
      const mockedTodos: Todo[] = [{ id: 1, title: 'aTitle', isClosed: true }];
      todoService.list.and.returnValue(of(mockedTodos));

      actions = hot('-a-', {
        a: loadTodos(),
      });
      const expected = cold('-b-', {
        b: loadTodosSuccess({ todos: mockedTodos }),
      });

      expect(effects.loadTodos$).toBeObservable(expected);
    });

    it('should dispatch loadTodosFailed action when todoService.list fails', () => {
      todoService.list.and.returnValue(cold('#'));

      actions = hot('-a-', {
        a: loadTodos(),
      });
      const expected = cold('-b-', {
        b: loadTodosFailed(),
      });

      expect(effects.loadTodos$).toBeObservable(expected);
    });
  });

  describe('changeTodoState$', () => {
    it('should dispatch changeTodoStateSuccess action when todoService.changeTodoState return a result', () => {
      const todoToUpdate: Todo = { id: 1, title: 'aTitle', isClosed: true };
      todoService.update.and.returnValue(of(todoToUpdate));

      actions = hot('-a-', {
        a: changeTodoState({ todo: todoToUpdate}),
      });
      const expected = cold('-b-', {
        b: changeTodoStateSuccess({ todo: todoToUpdate }),
      });

      expect(effects.changeTodoState$).toBeObservable(expected);
    });

    it('should dispatch changeTodoStateFailed action when todoService.changeTodoState fails', () => {
      const todoToUpdate: Todo = { id: 1, title: 'aTitle', isClosed: true };
      todoService.update.and.returnValue(cold('#'));

      actions = hot('-a-', {
        a: changeTodoState({ todo : todoToUpdate }),
      });
      const expected = cold('-b-', {
        b: changeTodoStateFailed(),
      });

      expect(effects.changeTodoState$).toBeObservable(expected);
    });
  });
});
