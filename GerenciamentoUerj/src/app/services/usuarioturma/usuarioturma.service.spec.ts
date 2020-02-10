import { TestBed } from '@angular/core/testing';

import { UsuarioturmaService } from './usuarioturma.service';

describe('UsuarioturmaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsuarioturmaService = TestBed.get(UsuarioturmaService);
    expect(service).toBeTruthy();
  });
});
