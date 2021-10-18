import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material-module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import { DisplayCompanyComponent } from './display-company/display-company.component';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { DisplayDepartmenntComponent } from './display-departmennt/display-departmennt.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { DisplayEmployeeComponent } from './display-employee/display-employee.component';
import { AddProjectToDeprtmentComponent } from './add-project-to-deprtment/add-project-to-deprtment.component';
import { DisplayProjectComponent } from './display-project/display-project.component';
import { AddProjectToEmployeComponent } from './add-project-to-employe/add-project-to-employe.component';
import { DisplayProjectEmployeeComponent } from './display-project-employee/display-project-employee.component';
import { AddEmployeePhoneComponent } from './add-employee-phone/add-employee-phone.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AddCompanyComponent,
    DisplayCompanyComponent,
    AddDepartmentComponent,
    DisplayDepartmenntComponent,
    AddEmployeeComponent,
    DisplayEmployeeComponent,
    AddProjectToDeprtmentComponent,
    DisplayProjectComponent,
    AddProjectToEmployeComponent,
    DisplayProjectEmployeeComponent,
    AddEmployeePhoneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
