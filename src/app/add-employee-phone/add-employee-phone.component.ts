import {Component, Inject, OnInit} from '@angular/core';
import {EmployeePhone} from '../modal/Modal';
import {EmployeePhoneService} from '../service/employee-phone.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-add-employee-phone',
  templateUrl: './add-employee-phone.component.html',
  styleUrls: ['./add-employee-phone.component.css']
})
export class AddEmployeePhoneComponent implements OnInit {
  employeePhone: EmployeePhone = {} as EmployeePhone;
  progressBar = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private employeePhoneService: EmployeePhoneService) {
  }

  ngOnInit(): void {
    if (this.data.idPhone != null) {
      this.employeePhoneService.findEmployeePhone(this.data.idPhone).subscribe(employeePhone => {
        this.employeePhone = employeePhone;
      });
    }
  }

  addPhone(): void {
    this.progressBar = true;
    if (this.data.idPhone != null) {
      this.employeePhoneService.editEmployeePhone(this.employeePhone, this.data.idPhone).subscribe(employeePhone => {
        this.employeePhone = employeePhone;
        window.location.reload();
      });
    } else {
      this.employeePhoneService.addEmployeePhone(this.employeePhone, this.data.idEmployee).subscribe(employeePhone => {
        this.employeePhone = employeePhone;
        window.location.reload();
      });
    }

  }
}
