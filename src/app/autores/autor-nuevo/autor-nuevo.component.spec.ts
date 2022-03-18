import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorNuevoComponent } from './autor-nuevo.component';

describe('AutorNuevoComponent', () => {
  let component: AutorNuevoComponent;
  let fixture: ComponentFixture<AutorNuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutorNuevoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
