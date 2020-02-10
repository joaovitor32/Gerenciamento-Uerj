import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaProfessorComponent } from './tabela-professor.component';

describe('TabelaProfessorComponent', () => {
  let component: TabelaProfessorComponent;
  let fixture: ComponentFixture<TabelaProfessorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabelaProfessorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
