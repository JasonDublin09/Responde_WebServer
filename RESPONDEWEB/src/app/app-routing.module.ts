import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {redirectLoggedInTo} from '@angular/fire/auth-guard'
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes),FormsModule,ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
