import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeePhoneComponent } from './add-employee-phone.component';

describe('AddEmployeePhoneComponent', () => {
  let component: AddEmployeePhoneComponent;
  let fixture: ComponentFixture<AddEmployeePhoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEmployeePhoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmployeePhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
