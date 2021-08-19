import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

  login(email:string, password:string){
  this.afAuth.signInWithEmailAndPassword(email,password).then(value => {
    console.log("Login Success");this.router.navigateByUrl('/dashboard');
  })
  .catch(err => {console.log("Something went wrong", err.message);});
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }
  private oAuthLogin(provider:any){
    return this.afAuth.signInWithPopup(provider)
  } 
}

