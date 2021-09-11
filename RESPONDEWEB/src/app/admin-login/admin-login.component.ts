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
  resetpass:FormGroup= new FormGroup({
    "reset":new FormControl(null,[Validators.required,Validators.email])
  })
  


  adminLogin: FormGroup = new FormGroup({
    "email": new FormControl(null,[Validators.required,Validators.email]),
    "password": new FormControl(null,[Validators.required])
  })


  constructor(
    private authService:AuthService,
    private afauth:AngularFireAuth
  ) { }

  ngOnInit() {
    //this.afauth.authState.pipe(map(user=>{console.log(user)}))
  }
onSubmit(){
  if (this.adminLogin.valid){
    console.log(this.adminLogin.value);
     this.authService.login(
      this.adminLogin.value.email,
      this.adminLogin.value.password
    )
    this.authService.admindata=this.adminLogin.value
    console.log(this.authService.admindata)
    return this.authService.admindata
  }
   /*this.afauth.authState.subscribe(res=>{
      if (res && res.uid){
        console.log('user login');
        this.admindata=this.adminLogin.value
        console.log(this.admindata)
        

      } else{
        console.log('user not logged in')
      }
      })*/ 
    //this.afauth.currentUser.then((data)=>console.log(data))
    
  }

reset(){
    console.log(this.resetpass.value.reset);
    this.authService.resetpassword(this.resetpass.value.reset)
  
}
}

