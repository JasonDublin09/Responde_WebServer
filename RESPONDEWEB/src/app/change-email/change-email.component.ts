import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css']
})
export class ChangeEmailComponent implements OnInit {
  changeemail: FormGroup = new FormGroup({
    "email": new FormControl
  })

  constructor(private router: Router,) { }

  ngOnInit(): void {
  }
onSubmit(){
  alert('Update successful');
  this.router.navigate(['/profile']);
}
}
