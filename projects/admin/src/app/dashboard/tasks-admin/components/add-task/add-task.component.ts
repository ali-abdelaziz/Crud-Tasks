import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TasksService } from '../../services/tasks.service';

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
    let formData = new FormData
    formData.append('title', this.newTaskForm.value['title'])
    formData.append('userId', this.newTaskForm.value['userId'])
    formData.append('image', this.newTaskForm.value['image'])
    formData.append('description', this.newTaskForm.value['description'])
    formData.append('deadline', this.newTaskForm.value['deadline'])
    this.service.createTask(formData).subscribe(res => {

    })

  }


}
