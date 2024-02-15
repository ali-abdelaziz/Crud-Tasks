import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private service: LoginService,
    private router: Router,
    private toaster: ToastrService
    ) { }
  loginForm!: FormGroup;

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role: ['user']
    })
  }

  login() {
    this.service.login(this.loginForm.value).subscribe(res => {
      this.router.navigate(['/tasks'])
      this.toaster.success("Login Success", "Success")
    })
  }
 
}
