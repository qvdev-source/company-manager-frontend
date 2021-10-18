import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
const API_URL = `${environment.BASE_URL}`;



@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class WorkOnService {

  constructor(private http: HttpClient) {
  }

  addWorkOn(data: any, id: number): Observable<any> {
    return this.http.post<any>(`${API_URL}/addWorkOn/${id}`, data);
  }

  doneWorkOn(data: any, id: number): Observable<any> {
    return this.http.put<any>(`${API_URL}/doneWorkOn/${id}`, data);
  }

}
