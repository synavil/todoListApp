/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoDetailsComponent } from './todo-details.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { MockBuilder, MockModule, MockProvider, NG_MOCKS_ROOT_PROVIDERS, ngMocks } from 'ng-mocks';
import { MatProgressSpinnerModule, MatSpinner } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { State } from 'src/app/store/reducer';
import { selectSelectedTodo } from 'src/app/store/selectors';
import { MockDatas } from 'test/mocks';
import { MatCardModule } from '@angular/material/card';
import { unloadSelectedTodo } from 'src/app/store/actions';
import { RouterTestingModule } from '@angular/router/testing';

describe('TodoDetailComponent', () => {
  let component: TodoDetailsComponent;
  let fixture: ComponentFixture<TodoDetailsComponent>;
  let store: MockStore<State>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoDetailsComponent ],
      imports: [
        RouterModule,
        RouterTestingModule.withRoutes([]),
        MatProgressSpinnerModule,
        MockModule(MatIconModule),
        MockModule(MatButtonModule),
        MockModule(MatCardModule)
      ],
      providers: [
        provideMockStore(),
        MockProvider(ActivatedRoute, {
          params: of([{'id': 1}])
        }),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoDetailsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch').and.callThrough()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('on loading', () => {
    beforeEach(() => {
      store.overrideSelector(selectSelectedTodo, undefined);
      fixture.detectChanges();
    })

    it('should display mat-spinner on loading selected todo', () => {
      expect(ngMocks.get('mat-spinner.loading', MatSpinner)).toBeTruthy();
    });
  });

  describe('selected to is retrieved', () => {

    beforeEach(() => {
      store.overrideSelector(selectSelectedTodo, MockDatas.todo1);
      fixture.detectChanges();
    });

    it('should display a todo when retreive with success', () => {
      expect(ngMocks.find('mat-card-title').nativeElement.textContent).toContain(MockDatas.todo1.title);
      expect(ngMocks.find('mat-card-content p:nth-of-type(1)').nativeElement.textContent).toContain('Etat : A faire');
      expect(ngMocks.find('mat-card-content p:nth-of-type(2)').nativeElement.textContent).toContain('Details : More details about todo 1');
    });
  });

  describe('on error', () => {
    beforeEach(() => {
      store.overrideSelector(selectSelectedTodo, null);
      fixture.detectChanges();
    })

    it('should display an error message', () => {
      expect(
        ngMocks.formatText(ngMocks.find('div.container > div.error-message > p')))
        .toEqual("La tâche n'a pas pu être chargé. La tâche n'existe pas ou une erreur est survenue.");
    });
  });

  describe('on destroy', () => {
    it('should unload selected to on destroy', () => {
      fixture.destroy()
      expect(store.dispatch).toHaveBeenCalledWith(unloadSelectedTodo());
    });
  });

  describe('on click "Liste des tâches" button', () => {
    beforeEach(() => {
      fixture.detectChanges();
    })

    it('shoul navigate to "/"', () => {
      const router = TestBed.inject(Router)

      ngMocks.click(ngMocks.find('a[href="/"] > button.return-button'));
      fixture.detectChanges();

      expect(router.url).toEqual('/');
    })
  });

});
