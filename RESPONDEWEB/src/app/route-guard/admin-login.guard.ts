import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginGuard implements CanActivate {
  constructor(
    private afAuth:AngularFireAuth,
    private router:Router
  ){}
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree | UrlTree> {
  /*  const user = await this.afAuth.authState;
    const isAuthenticated = user ? true:false;
    if (!isAuthenticated){
      this.router.navigate(['dashboard'])
    }
    return isAuthenticated
  }*/
  /*return this.authService.admindata.pipe(take(1),
  map(user=>{
    const isAuth=!!user;
    if(!isAuth)
    {
      return true;
    }
    return this.router.createUrlTree(['dashboard'])
  }))
}*/
const user = this.afAuth.authState
  
  const loggedIn= !!user;
  console.log(loggedIn)
  if (!loggedIn){
    this.router.navigate(['dashboard'])

  }
  return loggedIn
  }
}
