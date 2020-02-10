import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroProvasComponent } from './cadastro-provas.component';

describe('CadastroProvasComponent', () => {
  let component: CadastroProvasComponent;
  let fixture: ComponentFixture<CadastroProvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroProvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroProvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
