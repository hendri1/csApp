import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpThreePage } from './sign-up-three.page';

describe('SignUpThreePage', () => {
  let component: SignUpThreePage;
  let fixture: ComponentFixture<SignUpThreePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpThreePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpThreePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
