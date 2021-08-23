import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import 'firebase/auth';



@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  admindata: any;
  


  adminLogin: FormGroup = new FormGroup({
    "email": new FormControl(null,[Validators.required,Validators.email]),
    "password": new FormControl(null,[Validators.required])
  })


  constructor(
    private authService:AuthService,
    private afauth:AngularFireAuth
  ) { }

  ngOnInit() {
  }
onSubmit(){
  if (this.adminLogin.valid){
    console.log(this.adminLogin.value);
    this.authService.login(
      this.adminLogin.value.email,
      this.adminLogin.value.password
    )}

  }
}

