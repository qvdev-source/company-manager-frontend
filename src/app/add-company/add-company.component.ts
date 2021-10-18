import {Inject} from '@angular/core';
import {Component, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Company} from '../modal/Modal';
import {CompanyService} from '../service/company.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {
  company: Company = {} as Company;
  progressBar = false;

  constructor(private companyService: CompanyService, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    if (this.data.idCompany != null) {
      this.companyService.findCompany(this.data.idCompany).subscribe(company => {
        this.company = company;
      });
    }
  }

  addCompany(): void {
    this.progressBar = true;
    if (this.data.idCompany != null) {
      this.companyService.editCompany(this.company, this.data.idCompany).subscribe(company => {
        this.company = company;
        window.location.reload();
      });
    } else {
      this.companyService.addCompany(this.company, this.data.idUser).subscribe(company => {
        this.company = company;
        window.location.reload();
      });
    }
  }
}
