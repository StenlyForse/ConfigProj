import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }
    // пока заглушка
    authUser(authUserRequest: User): Observable<User>{
      localStorage.setItem('token', authUserRequest.username)
      return this.http.get<User>(this.baseApiUrl + '/api/catalog/');
    };
    isAuthenticated(): boolean {
      return !!localStorage.getItem('token'); // Проверяем наличие токена в локальном хранилище
    }
}