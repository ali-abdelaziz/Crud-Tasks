import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb:FormBuilder,
    private service: LoginService
    ) { }

  loginForm!: FormGroup

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.loginForm = this.fb.group( {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      role: ['admin']
    })
  }

  login() {
    this.service.login(this.loginForm.value).subscribe(res => {

    }, error => {
      
    })
    console.log(this.loginForm.value)
  }


}
