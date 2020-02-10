import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertDeleteMateriaComponent } from './alert-delete-materia.component';

describe('AlertDeleteMateriaComponent', () => {
  let component: AlertDeleteMateriaComponent;
  let fixture: ComponentFixture<AlertDeleteMateriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertDeleteMateriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertDeleteMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
