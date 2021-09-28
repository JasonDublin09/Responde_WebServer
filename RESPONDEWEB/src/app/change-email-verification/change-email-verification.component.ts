import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-change-email-verification',
  templateUrl: './change-email-verification.component.html',
  styleUrls: ['./change-email-verification.component.css']
})
export class ChangeEmailVerificationComponent implements OnInit {


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

    
  
  }
}
