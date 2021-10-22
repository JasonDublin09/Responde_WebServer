import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  updatepassword: FormGroup = new FormGroup({
    "password1": new FormControl(null,[Validators.required]),
    "password2": new FormControl(null,[Validators.required])
  })

  constructor(private router:Router,
    private authService:AuthService) { }

  ngOnInit(): void {
    console.log(this.authService.admindata)
  }
  onSubmit(){
  console.log(this.authService.admindata)
  if (this.updatepassword.value.password1 == this.updatepassword.value.password2){
    this.authService.updatePassword(this.authService.admindata.email,this.authService.admindata.password,this.updatepassword.value.password1)
  
    alert('Update successful');
    this.router.navigateByUrl('login')
  } else{
    alert('Password does not match');
  }
  
  }
}
