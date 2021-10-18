import {Component, OnInit} from '@angular/core';
import {Employee, EmployeePhone, Project} from '../modal/Modal';
import {EmployeeService} from '../service/employee.service';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {AddEmployeeComponent} from '../add-employee/add-employee.component';
import {AddProjectToEmployeComponent} from '../add-project-to-employe/add-project-to-employe.component';
import {AddEmployeePhoneComponent} from '../add-employee-phone/add-employee-phone.component';
import {EmployeePhoneService} from '../service/employee-phone.service';
import {ProjectService} from '../service/project.service';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit {
  employee: Employee = {} as Employee;
  employeePhones: EmployeePhone[];
  idEmployee: number;
  projects: Project[];

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute,
              private dialog: MatDialog, private employeePhoneService: EmployeePhoneService,
              private projectService: ProjectService) {
    this.route.params.subscribe(
      params => {
        this.idEmployee = this.route.snapshot.params.id;
        this.projectService.findProjectsForEmplopyee(this.idEmployee).subscribe(projects => {
          this.projects = projects;
        });
        this.employeeService.findEmployee(this.idEmployee).subscribe(employee => {
          this.employee = employee;
          this.employeePhoneService.findEmployeePhones(this.idEmployee).subscribe(employeePhones => {
            this.employeePhones = employeePhones;
          });
        });
      }
    );
  }

  ngOnInit(): void {

  }

  deleteEmployee(idEmployee): void {
    if (confirm('Are you sure')) {
      this.employeeService.deleteEmployee(idEmployee).subscribe(() => {
        window.location.replace(`/dashbaord`);
      });
    }
  }

  editEmployee(idEmployee): void {
    this.dialog.open(AddEmployeeComponent, {
      data: {idEmployee},
      height: '540px',
      width: '400px',
    });
  }

  addProjectToEmployee(idEmployee): void {
    this.dialog.open(AddProjectToEmployeComponent, {
      data: {idEmployee},
      height: '220px',
      width: '400px',
    });
  }

  addPhone(idEmployee): void {
    this.dialog.open(AddEmployeePhoneComponent, {
      data: {idEmployee},
      height: '250px',
      width: '400px',
    });
  }

  deletePhoone(idPhone): void {
    if (confirm('Are you sure')) {
      this.employeePhoneService.deleteEmployeePhone(idPhone).subscribe(() => {
        window.location.reload();
      });
    }
  }

  editPhoone(idPhone): void {
    this.dialog.open(AddEmployeePhoneComponent, {
      data: {idPhone},
      height: '250px',
      width: '400px',
    });
  }

  deleteProjectFromEmployee(idEmployee, idProject): void {
    if (confirm('Are you sure')) {
      this.projectService.deleteProjectFromEmployee(idEmployee, idProject).subscribe(() => {
        window.location.reload();
      });
    }
  }

}
