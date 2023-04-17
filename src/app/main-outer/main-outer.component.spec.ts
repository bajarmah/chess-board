import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainOuterComponent } from './main-outer.component';

describe('MainOuterComponent', () => {
  let component: MainOuterComponent;
  let fixture: ComponentFixture<MainOuterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainOuterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainOuterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
