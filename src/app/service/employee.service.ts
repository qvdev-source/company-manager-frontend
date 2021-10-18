import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
const API_URL = `${environment.BASE_URL}`;

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {
  }

  addEmployee(data: any, id: number): Observable<any> {
    return this.http.post<any>(`${API_URL}/addEmployee/${id}`, data);
  }

  editEmployee(data: any, id: number): Observable<any> {
    return this.http.put<any>(`${API_URL}/editEmployee/${id}`, data);
  }

  findEmployee(id: number): Observable<any> {
    return this.http.get<any>(`${API_URL}/findEmployee/${id}`);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete<any>(`${API_URL}/deleteEmployee/${id}`);
  }
}
