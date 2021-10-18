import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Department} from '../modal/Modal';
import {DepartmentService} from '../service/department.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {
  department: Department = {} as Department;
  progressBar = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private departmentService: DepartmentService) {
  }

  ngOnInit(): void {
    if (this.data.idDepartment != null) {
      this.departmentService.findDepartment(this.data.idDepartment).subscribe(department => {
        this.department = department;
      });
    }
  }

  addDeprtmant(): void {
    this.progressBar = true;
    if (this.data.idDepartment != null) {
      this.departmentService.editDepartment(this.department, this.data.idDepartment).subscribe(department => {
        this.department = department;
        window.location.reload();
      });
    } else {
      this.departmentService.addDepartment(this.department, this.data.idCompany).subscribe(department => {
        this.department = department;
        window.location.reload();
      });
    }
  }
}
