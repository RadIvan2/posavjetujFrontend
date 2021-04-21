import { DOCUMENT } from '@angular/common';
import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { UserModel } from '../shared/models/user.model';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(@Inject(DOCUMENT) document, private authService: AuthService, private router: Router, private userService:UserService){};

  username: string;
  password: string;
  name: string;
  surname: string;
  email: string;
  user:UserModel;

  roles=[{
    id:3
  }]


  onLogin(){
    this.authService.login(this.username,this.password).subscribe(data =>{
      this.router.navigate(['profil']);
    }, error =>{
      console.log('error occurred!');
    })
  }

  toRegister() {
      document.getElementById("login").style.left = "-400px";
      document.getElementById("register").style.left = "50px";
      document.getElementById("btn").style.left = "130px"
      document.getElementById("btn").style.width = "150px"
  }

  toLogin() {
      document.getElementById("login").style.left = "50px";
      document.getElementById("register").style.left = "450px";
      document.getElementById("btn").style.left = "0px"
      document.getElementById("btn").style.width = "120px"
  }

  onRegistrujSe(forma){
    this.user={
      username: this.username,
      password: this.password,
      name: this.name,
      surname: this.surname,
      email: this.email,
      roles:this.roles
    }
    this.userService.storeUser(this.user).subscribe(data=>{
      this.user=data;
    });
    alert("Uspjena registracija");
    this.router.navigate(['ulogujse']);

  }

}
