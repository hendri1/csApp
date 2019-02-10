import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpOnePage } from './sign-up-one.page';

describe('SignUpOnePage', () => {
  let component: SignUpOnePage;
  let fixture: ComponentFixture<SignUpOnePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpOnePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpOnePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
