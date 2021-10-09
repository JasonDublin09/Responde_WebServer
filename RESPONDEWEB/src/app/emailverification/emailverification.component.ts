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
    console.log(this.authService.admindata)
    
  }
  
  onSubmit(){
    if (this.authService.admindata == this.verify.value){
      
    }
    console.log(this.verify.value)
    this.router.navigateByUrl('/changeemail')
    //if (this.authService.admindata == this.verify.value){
      
    //}
   
    
  
  }

}
