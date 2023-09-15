import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { changeTodoState, changeTodoStateFailed, changeTodoStateSuccess, createNewTodo, createNewTodoFailed, createNewTodoSuccess, loadSelectedTodo, loadSelectedTodoFailed, loadSelectedTodoSuccess, loadTodos, loadTodosFailed, loadTodosSuccess } from './actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { TodoService } from '../services/todo.service';
import { Router } from '@angular/router';

@Injectable()
export class Effects {
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodos),
      mergeMap(() =>
        this.todoService.list().pipe(
          map((todos) => loadTodosSuccess({ todos })),
          catchError(() => [loadTodosFailed()])
        )
      )
    )
  );

  loadSelectedTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSelectedTodo),
      mergeMap( action =>
        this.todoService.get(action.todoId).pipe(
          map((todo) => loadSelectedTodoSuccess({ todo })),
          catchError(() => [loadSelectedTodoFailed()])
        )
      )
    )
  );

  changeTodoState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(changeTodoState),
      mergeMap((action) =>
        this.todoService.update({
          ...action.todo,
          isClosed: !action.todo.isClosed,
          closingDate: !action.todo.isClosed ? new Date() : undefined
        }).pipe(
          map((todo) => changeTodoStateSuccess({ todo })),
          catchError(() => [changeTodoStateFailed()])
        )
      )
    )
  );

  createNewTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createNewTodo),
      mergeMap( action =>

        this.todoService.create(action.newTodo).pipe(
          map((newTodo) => createNewTodoSuccess({ newTodo })),
          catchError(() => [createNewTodoFailed()])
        )
      )
    )
  );


  createTodoSuccess$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(createNewTodoSuccess),
        tap( _ => {
          this.router.navigate(['/']);
        })
      );
    },
    {dispatch: false}
  );

  constructor(private actions$: Actions, private todoService: TodoService, private router: Router) {}
}
