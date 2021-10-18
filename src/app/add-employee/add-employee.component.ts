import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Employee} from '../modal/Modal';
import {EmployeeService} from '../service/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  employee: Employee = {} as Employee;
  progressBar = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    if (this.data.idEmployee != null) {
      this.employeeService.findEmployee(this.data.idEmployee).subscribe(employee => {
        this.employee = employee;
      });
    }
  }

  addEmployee(): void {
    this.progressBar = true;
    if (this.data.idEmployee != null) {
      this.employeeService.editEmployee(this.employee, this.data.idEmployee).subscribe(employee => {
        this.employee = employee;
        window.location.reload();
      });
    } else {
      this.employeeService.addEmployee(this.employee, this.data.idDepartment).subscribe(employee => {
        this.employee = employee;
        window.location.reload();
      });
    }
  }
}
