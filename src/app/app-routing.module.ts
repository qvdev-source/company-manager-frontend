import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DisplayCompanyComponent } from './display-company/display-company.component';
import { DisplayDepartmenntComponent } from './display-departmennt/display-departmennt.component';
import { DisplayEmployeeComponent } from './display-employee/display-employee.component';
import { DisplayProjectComponent } from './display-project/display-project.component';
import { DisplayProjectEmployeeComponent } from './display-project-employee/display-project-employee.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashbaord',
    component: DashboardComponent,
    children: [
      {
        path: 'display-company/:id',
        component: DisplayCompanyComponent
      },
      {
        path: 'display-department/:id',
        component: DisplayDepartmenntComponent,
        children: [
          {
            path: 'display-project/:id',
            component: DisplayProjectComponent
          }
        ]
      },
      {
        path: 'display-employee/:id',
        component: DisplayEmployeeComponent
      },
      {
        path: 'display-project-employee/:id',
        component: DisplayProjectEmployeeComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
