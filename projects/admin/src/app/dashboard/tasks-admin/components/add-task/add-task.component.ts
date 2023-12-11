import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TasksService } from '../../services/tasks.service';
import * as moment from 'moment';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  constructor(
    private fb:FormBuilder,
    public dialog: MatDialogRef<AddTaskComponent>,
    public matDialog:MatDialog,
    private service: TasksService

    ) { }

  users:any = [
    {name:"Moahmed" , id:1},
    {name:"Ali" , id:2},
    {name:"Ahmed" , id:3},
    {name:"Zain" , id:4},
  ]

  fileName = ""
  newTaskForm!: FormGroup

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.newTaskForm = this.fb.group({
      title: ['', Validators.required],
      userId: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
      deadline: ['', Validators.required]
    })
  }

  selectImage(event:any) {
    this.fileName = event.target.value
    this.newTaskForm.get('image')?.setValue(event.target.files[0])
    // console.log(event);

  }

  createTask() {
    // console.log(this.newTaskForm.value);
    let model = this.prepareFormData()
    this.service.createTask(model).subscribe(res => {

    })

  }

  prepareFormData() {
    let newData = moment(this.newTaskForm.value['deadline']).format('DD-MM-YYYY')
    // this.newTaskForm.get('deadline')?.setValue(newData)
    let formData = new FormData()
    Object.entries(this.newTaskForm.value).forEach(([key , value]: any) => {
      // console.log(key , value);
      if (key == 'deadline') {
        formData.append(key , newData)
      }else {
        formData.append(key , value)
      }
    })

    return formData
  }


}
