import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
const API_URL = `${environment.BASE_URL}`;


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) {
  }

  addProjectToEmployee(idEmployee: number, idProject: number): Observable<any> {
    return this.http.post<any>(`${API_URL}/addProjectToEmployee/${idEmployee}/${idProject}`, null);
  }

  addProjectToDeprtment(data: any, id: number): Observable<any> {
    return this.http.post<any>(`${API_URL}/addProjectToDeprtment/${id}`, data);
  }

  editProject(data: any, id: number): Observable<any> {
    return this.http.put<any>(`${API_URL}/editProject/${id}`, data);
  }

  findProject(id: number): Observable<any> {
    return this.http.get<any>(`${API_URL}/findProject/${id}`);
  }

  deleteProejct(id: number): Observable<any> {
    return this.http.delete<any>(`${API_URL}/deleteProejct/${id}`);
  }

  findProjectsForEmplopyee(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/findProjectsForEmplopyee/${id}`);
  }

  findProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/findProjects`);
  }

  deleteProjectFromEmployee(idEmployee: number, idProject: number): Observable<any> {
    return this.http.delete<any>(`${API_URL}/deleteProjectFromEmployee/${idEmployee}/${idProject}`);
  }
}
