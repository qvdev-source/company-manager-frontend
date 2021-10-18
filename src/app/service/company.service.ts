import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
const API_URL = `${environment.BASE_URL}`;

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) {
  }

  addCompany(data: any, id: number): Observable<any> {
    return this.http.post<any>(`${API_URL}/addCompany/${id}`, data);
  }

  editCompany(data: any, id: number): Observable<any> {
    return this.http.put<any>(`${API_URL}/editCompany/${id}`, data);
  }

  findCompany(id: number): Observable<any> {
    return this.http.get<any>(`${API_URL}/findCompany/${id}`);
  }

  deleteCompany(id: number): Observable<any> {
    return this.http.delete<any>(`${API_URL}/deleteCompany/${id}`);
  }

  findCompanies(): Observable<any> {
    return this.http.get<any>(`${API_URL}/findCompanies`);
  }
}
