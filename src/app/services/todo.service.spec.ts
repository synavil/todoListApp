import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { first } from 'rxjs/operators';
import { Todo } from '../models/todo';
import { environment } from '../../environments/environment';
import { MockDatas } from 'test/mocks';

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should list todos', (done: DoneFn) => {
    const mockedTodoList: Todo[] = [MockDatas.todo1];

    service
      .list()
      .pipe(first())
      .subscribe((res: Todo[]) => {
        expect(res).toEqual(mockedTodoList);
        done();
      }, done.fail);

    const req = httpMock.expectOne(
      (r) => r.url === `${environment.baseUrl}/api/todos`
    );
    expect(req.request.method).toEqual('GET');

    req.flush(mockedTodoList);
  });

  it('should update a todo', (done: DoneFn) => {
    const updatedTodo: Todo = MockDatas.todo1;

    service
      .update(updatedTodo)
      .pipe(first())
      .subscribe((res: Todo) => {
        expect(res).toEqual(updatedTodo);
        done();
      }, done.fail);

    const req = httpMock.expectOne(
      (r) => r.url === `${environment.baseUrl}/api/todos/`
    );
    expect(req.request.method).toEqual('PUT');

    req.flush(updatedTodo);
  });

  it('should get a todo', (done: DoneFn) => {
    const todo: Todo = MockDatas.todo1;

    service
      .get(1)
      .pipe(first())
      .subscribe((res: Todo) => {
        expect(res).toEqual(todo);
        done();
      }, done.fail);

    const req = httpMock.expectOne(
      (r) => r.url === `${environment.baseUrl}/api/todos/1`
    );
    expect(req.request.method).toEqual('GET');

    req.flush(todo);
  });

  it('should create a todo', (done: DoneFn) => {
    const newTodo: Todo = {...MockDatas.todo1, id: null};
    const returnedTodo: Todo = {...newTodo, id: 8};

    service
      .create(newTodo)
      .pipe(first())
      .subscribe((res: Todo) => {
        expect(res).toEqual(returnedTodo);
        done();
      }, done.fail);

    const req = httpMock.expectOne(
      (r) => r.url === `${environment.baseUrl}/api/todos/` && r.body === newTodo
    );
    expect(req.request.method).toEqual('POST');

    req.flush(returnedTodo);
  });
});
