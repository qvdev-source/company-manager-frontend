import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
const API_URL = `${environment.BASE_URL}`;


@Injectable({
  providedIn: 'root'
})
export class EmployeePhoneService {
  constructor(private http: HttpClient) {
  }

  addEmployeePhone(data: any, id: number): Observable<any> {
    return this.http.post<any>(`${API_URL}/addEmployeePhone/${id}`, data);
  }

  editEmployeePhone(data: any, id: number): Observable<any> {
    return this.http.put<any>(`${API_URL}/editEmployeePhone/${id}`, data);
  }

  deleteEmployeePhone(id: number): Observable<any> {
    return this.http.delete<any>(`${API_URL}/deleteEmployeePhone/${id}`);
  }

  findEmployeePhones(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/findEmployeePhones/${id}`);
  }

  findEmployeePhone(id: number): Observable<any> {
    return this.http.get<any>(`${API_URL}/findEmployeePhone/${id}`);
  }
}
