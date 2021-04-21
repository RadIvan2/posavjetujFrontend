import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{
    
    constructor(private authService:AuthService, private router:Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const isLoggedIn = this.authService.isAuthenticatedSubject.getValue();
        console.log(isLoggedIn);
        if(isLoggedIn){
            return true;
        }
        this.router.navigate(['ulogujse']);
        return false;
    }

}