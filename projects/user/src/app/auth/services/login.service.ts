import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateAccount } from '../constant/DTOs';
import { environment } from 'projects/user/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  createUser(model: CreateAccount) {
   return this.http.post(environment.baseApi.replace('/tasks', '/auth') + '/createAccount' , model)
  }
}
