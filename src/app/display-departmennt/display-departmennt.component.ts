import {Component, OnInit} from '@angular/core';
import {Department} from '../modal/Modal';
import {DepartmentService} from '../service/department.service';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {AddDepartmentComponent} from '../add-department/add-department.component';
import {AddEmployeeComponent} from '../add-employee/add-employee.component';
import {AddProjectToDeprtmentComponent} from '../add-project-to-deprtment/add-project-to-deprtment.component';

@Component({
  selector: 'app-display-departmennt',
  templateUrl: './display-departmennt.component.html',
  styleUrls: ['./display-departmennt.component.css']
})
export class DisplayDepartmenntComponent implements OnInit {
  department: Department = {} as Department;
  idDepartment: number;

  constructor(private route: ActivatedRoute, private departmentService: DepartmentService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.idDepartment = this.route.snapshot.params.id;
    this.departmentService.findDepartment(this.idDepartment).subscribe(department => {
      this.department = department;
    });
  }

  addEmployee(idDepartment): void {
    this.dialog.open(AddEmployeeComponent, {
      data: {idDepartment},
      height: '540px',
      width: '400px',
    });
  }

  editDepartment(idDepartment): void {
    this.dialog.open(AddDepartmentComponent, {
      data: {idDepartment},
      height: '400px',
      width: '400px',
    });
  }

  deleteDepartment(idDepartment): void {
    if (confirm('Are you sure')) {
      this.departmentService.deleteDepartment(idDepartment).subscribe(() => {
        window.location.replace(`/dashbaord`);
      });
    }
  }

  addProject(idDepartment): void {
    this.dialog.open(AddProjectToDeprtmentComponent, {
      data: {idDepartment},
      height: '480px',
      width: '400px',
    });
  }
}
