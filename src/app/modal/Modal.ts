export interface Company {
  id: number;
  name: string;
  location: string;
  description: string;
  createAt: any;
  departments: Department[];
}

export interface Department {
  id: number;
  code: string;
  location: string;
  description: string;
  createAt: any;
  employees: Employee[];
  projects: Project[];
}

export interface Employee {
  id: number;
  name: string;
  address: string;
  salary: number;
  hiringDate: string;
  birthDate: string;
  employeePhones: EmployeePhone[];
  projects: Project[];
}

export interface EmployeePhone {
  id: number;
  phone: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  createAt: any;
  process: Process;
  workOns: WorkOn[];
}

export interface WorkOn {
  id: number;
  done: boolean;
  createAt: any;
}

export interface User {
  id: number;
  username: string;
  password: string;
  admin: boolean;
  companies: Company[];
}

export enum Process {
  TODO, WORKON, DONE
}
