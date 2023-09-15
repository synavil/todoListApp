/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoFormComponent } from './todo-form.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { State } from 'src/app/store/reducer';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockModule, ngMocks } from 'ng-mocks';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { Todo } from 'src/app/models/todo';

describe('TodoFormComponent', () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;
  let store: MockStore<State>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoFormComponent ],
      imports: [
        RouterModule.forRoot([]),
        RouterTestingModule,
        ReactiveFormsModule,
        MockModule(MatFormFieldModule),
        MockModule(MatProgressSpinnerModule),
        MockModule(MatCardModule),
      ],
      providers: [
        provideMockStore()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoFormComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch createNewTodo action when clicked on submit', () => {
    spyOn(store, 'dispatch').and.callThrough();
    const todoCreated: Todo = {title: "todo test", details: 'details of todo', id: null, isClosed: false, creationDate: new Date() }
    ngMocks.change('input[formcontrolname="title"]', todoCreated.title);
    ngMocks.change('textarea[formcontrolname="details"]', todoCreated.details);

    ngMocks.find('button[type="submit"]').nativeElement.click();
    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalled();
    expect(ngMocks.find('button[type="submit"]').nativeElement.disabled).toBeTrue();
  });

  it('should not submit when title is not set', () => {
    spyOn(store, 'dispatch').and.callThrough();
    const todoCreated: Todo = {title: "", details: 'details of todo', id: null, isClosed: false, creationDate: new Date() }
    ngMocks.change('input[formcontrolname="title"]', todoCreated.title);
    ngMocks.change('textarea[formcontrolname="details"]', todoCreated.details);

    ngMocks.find('button[type="submit"]').nativeElement.click();
    fixture.detectChanges();

    expect(store.dispatch).not.toHaveBeenCalled();
  });
});
