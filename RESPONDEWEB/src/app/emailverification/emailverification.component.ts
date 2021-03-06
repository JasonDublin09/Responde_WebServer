import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-emailverification',
  templateUrl: './emailverification.component.html',
  styleUrls: ['./emailverification.component.css']
})
export class EmailverificationComponent implements OnInit {
  verify: FormGroup = new FormGroup({
    "email": new FormControl,
    "password": new FormControl
  })
  

  constructor(private authService:AuthService,
    private router:Router) {
      
    
   }

  ngOnInit(): void {
    let email = localStorage.getItem('email')
    let password = localStorage.getItem('password')
    console.log(email)
    console.log(password)
    
  }
  
  onSubmit(){
    let email = localStorage.getItem('email')
    let password = localStorage.getItem('password')
    
    if (email == this.verify.value.email && password == this.verify.value.password){
      alert('User verified');
      this.router.navigateByUrl('/changeemail')
    }else{
      alert('Wrong Email');
      console.log(this.authService.admindata)
      console.log(this.verify.value)
    }
    
    //if (this.authService.admindata == this.verify.value){
      
     
    //}
   
    
  
  }

}
