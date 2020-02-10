import { TestBed } from '@angular/core/testing';

import { TabelaCadastroProfessorService } from './tabela-cadastro-professor.service';

describe('TabelaCadastroProfessorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TabelaCadastroProfessorService = TestBed.get(TabelaCadastroProfessorService);
    expect(service).toBeTruthy();
  });
});
