import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-emailverification',
  templateUrl: './emailverification.component.html',
  styleUrls: ['./emailverification.component.css']
})
export class EmailverificationComponent implements OnInit {
  verify:FormGroup = new FormGroup({
    "email": new FormControl,
    "password": new FormControl
  })

  constructor(private authService:AuthService,
    private router:Router) {
    
   }

  ngOnInit(): void {
    
  }
  
  onSubmit(){
    console.log(this.authService.admindata)
    console.log(this.verify.value)
    if (this.authService.admindata == this.verify.value){
      
    }
    this.router.navigateByUrl('changeemail')
    
  
  }

}
