import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';


@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {

  constructor(
    private afAuth:AngularFireAuth,
    private router:Router
  ){}
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree | UrlTree> {
  /*  const user = await this.afAuth.currentUser;
    const isAuthenticated = user ? true:false;
    if (!isAuthenticated){
      this.router.navigateByUrl('')
    }
    return isAuthenticated
  } */
  const user = this.afAuth.authState
   
  
  const loggedIn= !!user;
  console.log(loggedIn)
  if (!loggedIn){
    this.router.navigate(['login'])

  }
  return loggedIn
  }
  
}
