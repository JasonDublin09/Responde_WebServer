import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css']
})
export class ChangeEmailComponent implements OnInit {
  changeemail: FormGroup = new FormGroup({
    "email": new FormControl
  })

  constructor(private router:Router,
    private authService:AuthService) { }

  ngOnInit(): void {
  }
onSubmit(){
  this.authService.updateEmail(this.authService.admindata.email,this.authService.admindata.password,this.changeemail.value.email)
  this.router.navigateByUrl('login')
  
}
}
