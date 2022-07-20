import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OjoGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {}
  authV = false;

  redirect(flag: boolean): any {
    if (!flag) {
      this.router.navigate(['auth/login']).then(() => {
        window.location.reload();
      });
    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.auth.getToken()) {
        this.authV = true;
      }
      console.log(this.auth.getToken());
      
      this.redirect(this.authV);
      return this.authV;
  }
}
