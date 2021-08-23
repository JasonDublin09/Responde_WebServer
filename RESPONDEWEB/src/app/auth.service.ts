import { Injectable,NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore,AngularFirestoreDocument, ENABLE_PERSISTENCE } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { AngularFireAuth, PERSISTENCE } from '@angular/fire/auth';
import 'firebase/auth'
import {first,switchMap, take} from 'rxjs/operators';
import { UserModel } from './model/user-model'; 
import { Observable, of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentuser:any;
  admindata:any;
  user:any

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone,
    private afs: AngularFirestore
  ) {
   }

  
  login(email:string, password:string)
  { this.afAuth.setPersistence('session').then(()=>this.afAuth.signInWithEmailAndPassword(email,password).then(data=>{this.currentuser=data.user,this.router.navigateByUrl('dashboard')})
  .catch(err => {console.log("Something went wrong", err.message)})
  )
  console.log(this.currentuser)
};

  logout() {
    this.afAuth.signOut()
      this.router.navigateByUrl('');
    };
  
  private oAuthLogin(provider:any){
    return this.afAuth.signInWithPopup(provider)
  } 

  isLoggedin(){
    return this.afAuth.authState.pipe(take(1)).toPromise();
  }

  autologin(){
    if (this.afAuth.authState){
      return this.router.navigate(['dashboard'])
    }
    else{
      return this.router.navigate([''])
    }
  }

 
}

