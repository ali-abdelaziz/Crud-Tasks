import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TasksService } from '../../services/tasks.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { animate } from '@angular/animations';
import * as moment from 'moment';
export interface PeriodicElement {
  title: string;
  user: string;
  deadline: string;
  status: string;
}

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit {
  displayedColumns: string[] = ['position', 'title', 'user' ,'deadline','status', 'actions'];
  dataSource:any = [];
  tasksFilter!:FormGroup
  users:any = [
    {name:"Moahmed" , id:'657b1da1a67d4718046e086c'},
    {name:"Ali" , id:'657b1e76a67d4718046e086f'},
    {name:"Ahmed" , id:'657b1ea4a67d4718046e0872'}
    ]

  status:any = [
    {name:"Completed"},
    {name:"In-Progress"}
  ]

  filteration: any = {}
  timeoutId: any

  constructor(
    public dialog: MatDialog ,
    private fb:FormBuilder,
    private service: TasksService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService
    ) { }

  ngOnInit(): void {
    this.createform()
    this.getAllTasks()
  }

  createform() {
    this.tasksFilter = this.fb.group({
      title:[''],
      userId:[''],
      fromDate:[''],
      toDate:['']
    })
  }

  search(event: any) {
    this.filteration['keyword'] = event.value
    clearTimeout(this.timeoutId)
    this.timeoutId = setTimeout(() => {
    this.getAllTasks()
    }, 2000)
  }

  selectUser(event:any) {
    this.filteration['userId'] = event.value
    this.getAllTasks()
    // console.log(event);
  }

  selectStatus(event: any) {
    this.filteration['status'] = event.value
    this.getAllTasks()
    // console.log(event);
  }

  selectDate(event: any, type: any) {
    this.filteration[type] = moment(event.value).format('DD-MM-YYYY')
    // console.log(this.filteration);
    if(type == 'toDate' && this.filteration['toDate'] !== 'Invalid date') {
      this.getAllTasks()
    }
  }

  getAllTasks() {
    this.spinner.show()
    return this.service.getAllTasks(this.filteration).subscribe((res: any) => {
      this.dataSource = this.mappingTasks(res.tasks)
      this.spinner.hide()
    }, error => {
      this.toaster.error(error.error.message)
      this.spinner.hide()
    })
  }

  mappingTasks(data: any[]) {
    let newTasks = data.map(item =>{
      return {
        // title: item.title,
        // deadline: item.deadline,
        // status: item.status,
        ...item,
        user: item.userId.username
      }
    })

    return newTasks
    // console.log(newTasks);
    
  }

  deleteTask(id: any) {
    this.spinner.show()
    this.service.deleteTask(id).subscribe(res => {
      this.toaster.success("Task Deleted Successfully", "Success")
      this.spinner.hide()
      this.getAllTasks()
    }, error => {
      this.toaster.error(error.error.message)
      this.spinner.hide()
    })
  }

  updateTask(element: any) {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '750px',
      data: element,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.getAllTasks()
        // console.log(result);
      }
    })
  }

  addTask() {
      const dialogRef = this.dialog.open(AddTaskComponent, {
        width: '750px',
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          this.getAllTasks()
          // console.log(result);
        }
      })
  }

}
