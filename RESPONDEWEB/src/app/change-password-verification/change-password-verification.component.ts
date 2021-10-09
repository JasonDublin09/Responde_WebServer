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
  }
  onSubmit(){
    console.log(this.authService.admindata)
    console.log(this.verification.value)
    if (this.authService.admindata == this.verification.value){
      
    }
    alert('User verified');
    this.router.navigateByUrl('changepassword')
    
      }
      
}

