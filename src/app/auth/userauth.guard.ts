import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({providedIn: 'root'})
export class UserAuthGuard implements CanActivate{
    
    constructor(private authService:AuthService, private router:Router){}



    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        var routeRole:string;
        const isLoggedIn = localStorage.getItem("Role").split(',');
        routeRole=route.data['role'];

        for(let role of routeRole){
            for(let rolePom of isLoggedIn){
            if(role==rolePom){
                return true;
            }
            }
        }
        this.router.navigate(['profil']);
        return false;
    }

}