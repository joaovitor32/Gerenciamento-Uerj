import { TestBed } from '@angular/core/testing';

import { TabelaCadastroMateriaService } from './tabela-cadastro-materia.service';

describe('TabelaCadastroMateriaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TabelaCadastroMateriaService = TestBed.get(TabelaCadastroMateriaService);
    expect(service).toBeTruthy();
  });
});
