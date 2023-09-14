import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Todo } from 'src/app/models/todo';
import { loadSelectedTodo, unloadSelectedTodo } from 'src/app/store/actions';
import { selectSelectedTodo } from 'src/app/store/selectors';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss']
})
export class TodoDetailsComponent implements OnInit, OnDestroy {
  id: number | undefined;
  _selectedTodo: Todo | undefined | null;
  constructor(
    private route: ActivatedRoute,
    private store: Store) {
    }

  ngOnInit() {
    this.store.select(selectSelectedTodo).subscribe(todo => {
        this._selectedTodo = todo
      }
    );
    this.route.params.subscribe(params => {
      this.store.dispatch(loadSelectedTodo({ todoId: params['id']}))
    });
  }

  ngOnDestroy(){
    this.store.dispatch(unloadSelectedTodo());
  }
}
