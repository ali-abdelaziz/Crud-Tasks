import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { }

  getAllTasks() {
    return this.http.get('https://crud-85gs.onrender.com/tasks/all-tasks')
  }

}
