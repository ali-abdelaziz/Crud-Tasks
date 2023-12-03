import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './components/users/users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ManageUsersRoutingModule } from './manage-users-routing.module';
import { MaterialModule } from '../../material/material.module';



@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ManageUsersRoutingModule,
    HttpClientModule,
    CommonModule
  ]
})
export class ManageUsersModule { }
