import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
const API_URL = `${environment.BASE_URL}`;


@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) {
  }

  addDepartment(data: any, id: number): Observable<any> {
    return this.http.post<any>(`${API_URL}/addDepartment/${id}`, data);
  }

  editDepartment(data: any, id: number): Observable<any> {
    return this.http.put<any>(`${API_URL}/editDepartment/${id}`, data);
  }

  findDepartment(id: number): Observable<any> {
    return this.http.get<any>(`${API_URL}/findDepartment/${id}`);
  }

  deleteDepartment(id: number): Observable<any> {
    return this.http.delete<any>(`${API_URL}/deleteDepartment/${id}`);
  }
}
