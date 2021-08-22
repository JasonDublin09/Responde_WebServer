import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-change-password-verification',
  templateUrl: './change-password-verification.component.html',
  styleUrls: ['./change-password-verification.component.css']
})
export class ChangePasswordVerificationComponent implements OnInit {

  adminLogin: FormGroup = new FormGroup({
    "email": new FormControl,
    "password": new FormControl
  })
  constructor(
    private authService:AuthService
  ) { }

  ngOnInit(): void {
  }
  onSubmit(){
    if (this.adminLogin.valid){
      console.log(this.adminLogin.value);
      this.authService.login(
        this.adminLogin.value.email,
        this.adminLogin.value.password
      )
    }
  
  }
}
