import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotasQtdComponent } from './notas-qtd.component';

describe('NotasQtdComponent', () => {
  let component: NotasQtdComponent;
  let fixture: ComponentFixture<NotasQtdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotasQtdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotasQtdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
