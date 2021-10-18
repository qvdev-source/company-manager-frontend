import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Company} from '../modal/Modal';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {CompanyService} from './company.service';
import {ProjectService} from './project.service';

export class NodeAction {
  linkActive: string;
  url: string;
  title: string;
}

export class ApplicationItemNode {
  children: ApplicationItemNode[] = [];
  name: string;
  id: number;
  clazz: string;
  actions: NodeAction[] = [];
  title: string;
  routerLink: any;

}

export class ApplicationItemFlatNode {
  id: number;
  item: string;
  clazz: string;
  level: number;
  name: string;
  expandable: boolean;
  actions: NodeAction[] = [];
  title: string;
  routerLink: any;
}

@Injectable({
  providedIn: 'root'
})
export class TreeCompanyService {
  companies: Company[];
  applicationData = new BehaviorSubject<ApplicationItemNode[]>([]);
  applicationState = new BehaviorSubject<Company>({} as Company);

  constructor(private companyService: CompanyService, private projectService: ProjectService) {
    this.initialize();

  }

  initialize(): void {
    this.applicationState.subscribe(() => {
      this.buildFileTree(0).subscribe(user => {
        this.applicationData.next(user);
      });
    });
    this.buildFileTree(0).subscribe(value => {
      this.applicationData.next(value);
    });
  }

  get data(): ApplicationItemNode[] {
    return this.applicationData.value;
  }

  buildFileTree(level: number): Observable<ApplicationItemNode[]> {
    const nodes: ApplicationItemNode[] = [];

    return new Observable((observer) => {
      return this.companyService.findCompanies().subscribe(companies => {
        this.companies = companies.forEach(company => {
          const nodeCompany = new ApplicationItemNode();
          nodeCompany.name = company.name;
          nodeCompany.id = company.id;
          nodeCompany.routerLink = 'display-company/' + company.id;
          nodeCompany.clazz = 'fab fa-accusoft';
          nodeCompany.title = 'Display ' + company.name;
          nodes.push(nodeCompany);

          if (company.departments.length > 0) {
            company.departments.forEach(department => {
              const nodeDepartment = new ApplicationItemNode();
              nodeDepartment.name = department.code;
              nodeDepartment.id = department.id;
              nodeDepartment.routerLink = 'display-department/' + department.id;
              nodeDepartment.clazz = 'fas fa-building';
              nodeDepartment.title = 'Display department ' + department.code;
              nodeCompany.children.push(nodeDepartment);

              if (department.employees.length > 0) {
                department.employees.forEach(employee => {
                  const nodeEmployee = new ApplicationItemNode();
                  nodeEmployee.name = employee.name;
                  nodeEmployee.id = employee.id;
                  nodeEmployee.routerLink = 'display-employee/' + employee.id;
                  nodeEmployee.clazz = 'fas fa-user-secret';
                  nodeEmployee.title = 'Display employee ' + employee.name;
                  nodeDepartment.children.push(nodeEmployee);
                });
              }
            });
          }
        });
        observer.next(nodes);
      });
    });
  }
}
