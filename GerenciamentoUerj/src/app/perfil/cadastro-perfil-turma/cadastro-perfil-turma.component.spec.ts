import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroPerfilTurmaComponent } from './cadastro-perfil-turma.component';

describe('CadastroPerfilTurmaComponent', () => {
  let component: CadastroPerfilTurmaComponent;
  let fixture: ComponentFixture<CadastroPerfilTurmaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroPerfilTurmaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroPerfilTurmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
