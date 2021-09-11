import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';


@Injectable({
  providedIn: 'root'
})

export class LoginguardGuard implements CanActivate {
  constructor(
    private afAuth:AngularFireAuth,
    private router:Router,
    private authService:AuthService
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const user= this.authService.userloggedin

      if (user!=null){
        this.router.navigateByUrl('dashboard')

      }
      else{
        return true
      }
    return true;

    

  }
  
}
