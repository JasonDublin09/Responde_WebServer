import { Injectable,NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore,AngularFirestoreDocument, ENABLE_PERSISTENCE } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { AngularFireAuth, PERSISTENCE } from '@angular/fire/auth';
import 'firebase/auth'
import {first,switchMap, take} from 'rxjs/operators';
import { UserModel } from './model/user-model'; 
import { BehaviorSubject, Observable, of } from 'rxjs';
import { } from 'firebase/auth'
import { FormGroup } from '@angular/forms';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  currentuser:any;
  user:any
  userloggedin: boolean;
  admindata:any
  incomingReportRef?: AngularFireList<any>;
  historyReportRef?: AngularFireList<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone,
    private afs: AngularFirestore,
    private db: AngularFireDatabase,
  ) {
    this.userloggedin=false;

    this.afAuth.onAuthStateChanged((user) => {
      if (user){
        this.userloggedin =true;
      } else{
        this.userloggedin = false;
      }
    })
   }

  
  login(email:string, password:string):Promise<any>{
  /*{  this.afAuth.setPersistence('session').then(()=>this.afAuth.signInWithEmailAndPassword(email,password).then(data=>{console.log(data),this.admindata=data,this.router.navigateByUrl('dashboard')})
  .catch(err => {console.log("Something went wrong", err.message)})
  )
  console.log(this.currentuser)*/

  return this.afAuth.signInWithEmailAndPassword(email,password).then((data)=>{
    console.log('Login User Success');
    this.admindata={email:email,password:password}
    console.log(this.admindata)
    this.router.navigate(['/dashboard']);
  })
  .catch(error =>{
    console.log("login error")
  })
};

  logout():Promise<void> {
    return this.afAuth.signOut().then(()=>{
      this.admindata=null
      console.log(this.admindata)
      this.router.navigate(['login'])
    })
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

  resetpassword(email:string){
    this.afAuth.sendPasswordResetEmail(email).then(()=>{console.log("Reset Sent")}).catch((error)=>{var ErrorCode=error.code;
      console.log(ErrorCode)})
  }

  updatePassword ( email:string, password:string, updatepass:string ) {
    this.afAuth.signInWithEmailAndPassword(email,password).then(function (user)
    {user.user?.updatePassword(updatepass)
    
      
    })
  }

  updateEmail (email:string, password:string, uEmail:string){
    this.afAuth.signInWithEmailAndPassword(email,password).then(function (user)
    {user.user?.updateEmail(uEmail)})
  }

  getUser():Promise<any>{
    return this.afAuth.authState.pipe(first()).toPromise();
  }
    
  getIncomingReportList(){
    this.incomingReportRef = this.db.list('/IncomingReport/');
    return this.incomingReportRef;
  }
  getReportList(){
    this.historyReportRef = this.db.list('/ReportHistory/');
    return this.historyReportRef;
  }
  get(uid: any){
    // access db child
    return this.db.object('/IncomingReport/' + uid);
  }

  getArchive(uid: any){
    // access db child
    return this.db.object('/ReportHistory/' + uid);
  }

  updateNote(uid: string, value:any): void{
    this.db.list('/IncomingReport/').update(uid,value)
  }

  getreports(){
    return this.db.list('/IncomingReport/', ref => ref.orderByChild("option").equalTo('home'));
  }

}



