import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Todo } from 'src/app/models/todo';
import { createNewTodo } from 'src/app/store/actions';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
  todoFormGroup = new FormGroup({
    title: new FormControl('', []),
    details: new FormControl('')
  });

  submitLoading = false;

  constructor(private store: Store, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(){
    if(this.todoFormGroup.valid) {
      const newTodo: Todo = {
        id: null,
        title: this.todoFormGroup.value.title,
        details: this.todoFormGroup.value.details,
        isClosed: false,
        creationDate: new Date(),
      };
      this.submitLoading = true;
      this.store.dispatch(createNewTodo({ newTodo }));
    }
  }
}
