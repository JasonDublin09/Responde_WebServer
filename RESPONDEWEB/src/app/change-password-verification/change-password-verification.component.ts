import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-change-password-verification',
  templateUrl: './change-password-verification.component.html',
  styleUrls: ['./change-password-verification.component.css']
})
export class ChangePasswordVerificationComponent implements OnInit {

  verification: FormGroup = new FormGroup({
    "email": new FormControl,
    "password": new FormControl
  })
  constructor(
    private authService:AuthService,
    private router:Router,
    
  ) { }

  ngOnInit() {
    let email = localStorage.getItem('email')
    let password = localStorage.getItem('password')
    console.log(email)
    console.log(password)
  }
  onSubmit(){
    let email = localStorage.getItem('email')
    let password = localStorage.getItem('password')
    if (email == this.verification.value.email && password == this.verification.value.password){
      alert('User verified');
    this.router.navigateByUrl('changepassword')
    }else {
      alert('Wrond Credentials')
    }
    
    
      }
      
}

