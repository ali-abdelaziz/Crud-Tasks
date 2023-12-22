import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TasksService } from '../../services/tasks.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

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
    private service: TasksService,
    private toaster: ToastrService,
    private spinner : NgxSpinnerService

    ) { }

  users:any = [
    {name:"Moahmed" , id:'657b1da1a67d4718046e086c'},
    {name:"Ali" , id:'657b1e76a67d4718046e086f'},
    {name:"Ahmed" , id:'657b1ea4a67d4718046e0872'}
    ]

  fileName = ""
  newTaskForm!: FormGroup

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.newTaskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
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
    this.spinner.show()
    let model = this.prepareFormData()
    this.service.createTask(model).subscribe(res => {
      this.toaster.success("Task Created Successfully", "Success")
      this.spinner.hide()
      this.dialog.close(true)
    }, error => {
      this.spinner.hide()
      this.toaster.error(error.error.message)
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
