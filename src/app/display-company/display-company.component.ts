import {Component, OnInit} from '@angular/core';
import {Company} from '../modal/Modal';
import {CompanyService} from '../service/company.service';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {AddCompanyComponent} from '../add-company/add-company.component';
import {AddDepartmentComponent} from '../add-department/add-department.component';

@Component({
  selector: 'app-display-company',
  templateUrl: './display-company.component.html',
  styleUrls: ['./display-company.component.css']
})
export class DisplayCompanyComponent implements OnInit {
  id: number;
  company: Company = {} as Company;

  constructor(private companyService: CompanyService, private route: ActivatedRoute,
              private dialog: MatDialog) {
    this.route.params.subscribe(
      params => {
        this.id = this.route.snapshot.params.id;
        this.companyService.findCompany(this.id).subscribe(company => {
          this.company = company;
        });
      }
    );
  }

  ngOnInit(): void {

  }

  editCompany(idCompany): void {
    this.dialog.open(AddCompanyComponent, {
      data: {idCompany},
      height: '400px',
      width: '400px',
    });
  }

  deleteCompany(idCompany): void {
    if (confirm('Are you sure')) {
      this.companyService.deleteCompany(idCompany).subscribe(() => {
        window.location.replace(`/dashbaord`);
      });
    }
  }

  addDepartment(idCompany): void {
    this.dialog.open(AddDepartmentComponent, {
      data: {idCompany},
      height: '400px',
      width: '400px',
    });
  }
}
