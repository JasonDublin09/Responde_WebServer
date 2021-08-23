import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'RESPONDEWEB';

  constructor(
    private afauth:AuthService
  ){}
  ngOnInit() {
    this.afauth.isLoggedin()
  }
  
}
