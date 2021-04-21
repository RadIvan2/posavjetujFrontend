import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
    selector:'app-navbar',
    templateUrl:'./navbar.component.html',
    styleUrls:['./navbar.component.css']
})
export class NavbarComponent{
    
    isAuthenticated: Observable<boolean>;

    constructor(private authService: AuthService, private router: Router){
        this.isAuthenticated=authService.isAuthenticatedSubject;
    }

    loginTriggered: boolean = false;

    isExpanded: boolean = false;
  //  isAuthenticated: boolean = this.authService.isAuthenticatedSubject.getValue();

    links: any[]=[
        { name: 'Pocetna', url: '/pocetna'},
        { name: 'Galerija pitanja', url: '/galerija'}
    ];


    toggleDropdown(isExpanded){
        this.isExpanded=!isExpanded;
    }

    onLogOut(){
        this.authService.logout();
        this.router.navigate(['ulogujse']);

    }

}