import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardHelpPage } from './dashboard-help.page';

describe('DashboardHelpPage', () => {
  let component: DashboardHelpPage;
  let fixture: ComponentFixture<DashboardHelpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardHelpPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardHelpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
