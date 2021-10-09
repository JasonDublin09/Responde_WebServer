import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})

export class ProfilePageComponent implements OnInit {

  userEmail: any = '';

  constructor(private afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => {
      this.userEmail = user?.email;
      console.log(user?.email);
    });
  }

  ngOnInit(): void {
    
  }

}
