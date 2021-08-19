import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  adminLogin: FormGroup = new FormGroup({
    "email": new FormControl,
    "password": new FormControl
  })

  
  constructor(
    private authService:AuthService
  ) { }

  ngOnInit() {
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
