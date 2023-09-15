import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { State } from '../../store/reducer';
import { selectTodos } from '../../store/selectors';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { MatList, MatListItem } from '@angular/material/list';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import {MockComponents, MockedComponent, ngMocks} from 'ng-mocks';
import { By } from '@angular/platform-browser';
import { DefaultProjectorFn, MemoizedSelector } from '@ngrx/store';
import { Todo } from '../../models/todo';
import { changeTodoState } from '../../store/actions';
import { MockDatas } from 'test/mocks';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let store: MockStore<State>;
  let mockTodosSelector: MemoizedSelector<object, Todo[] | undefined, DefaultProjectorFn<Todo[] | undefined>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TodoListComponent,
        MockComponents(
          MatListItem,
          MatList,
          MatCardContent,
          MatCardTitle,
          MatCard
        ),
      ],
      imports: [
        MatRippleModule,
        FormsModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        RouterModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [provideMockStore()],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;

    mockTodosSelector = store.overrideSelector(selectTodos, [
      MockDatas.todoNotClosed,
      MockDatas.todo2,
      MockDatas.todo3,
    ]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a title', () => {
    expect(fixture.debugElement.query(By.css('mat-card-title')).nativeElement.innerText).toEqual(
      'Todos'
    );
  });

  it('should display todos', () => {
    const todoElements = fixture.debugElement.queryAll(By.css('mat-list mat-list-item'));
    expect(todoElements.length).toEqual(3);
    expect(todoElements[0].query(By.css('h4')).nativeElement.innerText).toContain(MockDatas.todoNotClosed.title);
    expect(todoElements[1].query(By.css('h4')).nativeElement.innerText).toContain(MockDatas.todo2.title);
    expect(todoElements[2].query(By.css('h4')).nativeElement.innerText).toContain(MockDatas.todo3.title);
    const todoCheckboxes: MockedComponent<MatCheckbox>[] =
      todoElements.map(item => item.query(By.css('mat-checkbox'))).map(item => item.componentInstance);
    expect(todoCheckboxes[0].checked).toBeFalse();
    expect(todoCheckboxes[1].checked).toBeFalse();
    expect(todoCheckboxes[2].checked).toBeTrue();
  });

  it('should change state from "to do" to "done" when clic on checkbox of element in "to do" state', () => {
    spyOn(store, 'dispatch').and.callThrough()
    const todoElements = ngMocks.findAll('mat-list mat-list-item');
    const  checkBoxTodo1 = ngMocks.find(todoElements[0], MatCheckbox);
    expect(todoElements.length).toEqual(3);
    expect(ngMocks.formatText(todoElements[0])).toContain(MockDatas.todoNotClosed.title);
    expect(ngMocks.formatText(todoElements[1])).toContain(MockDatas.todo2.title);
    expect(ngMocks.formatText(todoElements[2])).toContain(MockDatas.todo3.title);
    expect(checkBoxTodo1.attributes['ng-reflect-checked']).toBe('false');

    ngMocks.click(checkBoxTodo1);
    mockTodosSelector.setResult( [
      MockDatas.todo2,
      MockDatas.todo3,
      {...MockDatas.todoNotClosed, isClosed: true}
    ]);
    store.refreshState();
    fixture.detectChanges();

    const todoElementsAfterChange = ngMocks.findAll('mat-list mat-list-item');
    const checkBoxTodo1AfterChange = ngMocks.find(todoElementsAfterChange[2], MatCheckbox);
    expect(store.dispatch).toHaveBeenCalledOnceWith(changeTodoState({todo: MockDatas.todoNotClosed}))
    expect(ngMocks.formatText(todoElementsAfterChange[0])).toContain(MockDatas.todo2.title);
    expect(ngMocks.formatText(todoElementsAfterChange[1])).toContain(MockDatas.todo3.title);
    expect(ngMocks.formatText(todoElementsAfterChange[2])).toContain(MockDatas.todoNotClosed.title);
    expect(checkBoxTodo1AfterChange.attributes['ng-reflect-checked']).toBe('true');
  })

  it('shoul navigate to "/details/:id" when clic on todo title', () => {
    expect(ngMocks.find('mat-list mat-list-item:nth-of-type(2) a[href="/details/2"] span')).toBeTruthy();
  });

  it('shoul navigate to "/create" when clic on "Nouvelle tâche" button', () => {
    expect(ngMocks.find('mat-card.actions-card a[href="/create"] button.new-todo-btn')).toBeTruthy();
  });
});
