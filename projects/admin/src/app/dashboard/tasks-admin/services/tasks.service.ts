import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateTask } from '../context/DTOs';
import { environment } from 'projects/admin/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { }

  getAllTasks(filter: any) {
    let params = new HttpParams()
    if(filter.keyword) {
      params = params.append('keyword', filter.keyword)
    }
    return this.http.get(environment.baseApi + '/all-tasks', {params})
  }

  createTask(model:any) {
    return this.http.post(environment.baseApi + '/add-task', model)
  }

  updateTask(model:any, id:any) {
    return this.http.put(environment.baseApi + '/edit-task/' + id, model)
  }

  deleteTask(id: any) {
    return this.http.delete(environment.baseApi + '/delete-task/' + id)
  }
}
