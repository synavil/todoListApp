import {Component, OnInit} from '@angular/core';
import {Todo} from '../../models/todo';
import {Store} from '@ngrx/store';
import {selectTodos} from '../../store/selectors';
import {changeTodoState, loadTodos} from '../../store/actions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  _todos: Todo[] | undefined;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(selectTodos).subscribe(todos => this._todos = todos);
     this.store.dispatch(loadTodos());
  }

  todoStateChange(todo: Todo){
    this.store.dispatch(changeTodoState({ todo }));
  }

}
