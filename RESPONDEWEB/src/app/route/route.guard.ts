import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {
  constructor(
    private afAuth:AngularFireAuth,
    private router:Router,
    private authService:AuthService
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Promise((resolve,reject) =>{
          if (this.authService.userloggedin){
            


            resolve(true),console.log(this.authService.userloggedin)
          } else{
            console.log('Authguard: user not logged in');
            this.router.navigate(['login']);
            resolve(false)
          }
        })
      }
    }
