import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpTwoPage } from './sign-up-two.page';

describe('SignUpTwoPage', () => {
  let component: SignUpTwoPage;
  let fixture: ComponentFixture<SignUpTwoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpTwoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpTwoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
