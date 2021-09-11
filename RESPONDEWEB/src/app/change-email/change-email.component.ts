import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css']
})
export class ChangeEmailComponent implements OnInit {
  changeemail: FormGroup = new FormGroup({
    "email": new FormControl
  })

  constructor() { }

  ngOnInit(): void {
  }
onSubmit(){
  
}
}
