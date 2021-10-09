import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  constructor(
    private authservice:AuthService,
    private afA: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout(){
    this.afA.signOut().then(() => {
      alert('Logging out.');
      this.router.navigate(['']);
    })
  }
}
