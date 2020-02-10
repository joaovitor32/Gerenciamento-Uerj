import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaMateriaComponent } from './tabela-materia.component';

describe('TabelaMateriaComponent', () => {
  let component: TabelaMateriaComponent;
  let fixture: ComponentFixture<TabelaMateriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabelaMateriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
