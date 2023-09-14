import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { changeTodoState, changeTodoStateFailed, changeTodoStateSuccess, loadSelectedTodo, loadSelectedTodoFailed, loadSelectedTodoSuccess, loadTodos, loadTodosFailed, loadTodosSuccess } from './actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { TodoService } from '../services/todo.service';

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
        this.todoService.update({ ...action.todo, isClosed: !action.todo.isClosed }).pipe(
          map((todo) => changeTodoStateSuccess({ todo })),
          catchError(() => [changeTodoStateFailed()])
        )
      )
    )
  );

  constructor(private actions$: Actions, private todoService: TodoService) {}
}
