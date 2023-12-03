import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../context/DTOs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(model: Login) {
    return this.http.post('https://crud-85gs.onrender.com/auth/login', model)
  }
}
