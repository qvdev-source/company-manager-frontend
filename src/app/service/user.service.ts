import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../modal/Modal';
import {environment} from '../../environments/environment';
const API_URL = `${environment.BASE_URL}`;


const USERNAME_KEY = 'USERNAME';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${API_URL}/api/addUser`, user);
  }

  editUser(user: User, idUser: number): Observable<User> {
    return this.http.post<User>(`${API_URL}/api/editUser/${idUser}`, user);
  }

  findUserById(id: number): Observable<User> {
    return this.http.get<User>(`${API_URL}/api/findUserById/${id}`);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${API_URL}/api/deleteUser/${id}`);
  }

  findAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${API_URL}/api/findAllUsers/`);
  }

  findByUsername(name: string): Observable<User> {
    return this.http.get<User>(`${API_URL}/api/findByUsername/${name}`);
  }

  saveUsername(username: string): void {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }

  getUsername(): string {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  logout(): void {
    window.sessionStorage.clear();
  }
}
