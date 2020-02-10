import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertTurmaDeleteComponent } from './alert-turma-delete.component';

describe('AlertTurmaDeleteComponent', () => {
  let component: AlertTurmaDeleteComponent;
  let fixture: ComponentFixture<AlertTurmaDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertTurmaDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertTurmaDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
