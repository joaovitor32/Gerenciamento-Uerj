import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroMateriaComponent } from './cadastro-materia.component';

describe('CadastroMateriaComponent', () => {
  let component: CadastroMateriaComponent;
  let fixture: ComponentFixture<CadastroMateriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroMateriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
