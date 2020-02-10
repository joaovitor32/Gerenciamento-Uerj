import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurmasProfessorComponent } from './turmas-professor.component';

describe('TurmasProfessorComponent', () => {
  let component: TurmasProfessorComponent;
  let fixture: ComponentFixture<TurmasProfessorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurmasProfessorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurmasProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
