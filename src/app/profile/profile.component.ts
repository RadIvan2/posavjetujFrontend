import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { AnswerModel } from '../shared/models/answer.model';
import { QuestionModel } from '../shared/models/question.model';
import { RoleModel } from '../shared/models/role.model';
import { UserModel } from '../shared/models/user.model';
import { QuestionService } from '../shared/services/question.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService:UserService, private authService:AuthService) { }

  user:UserModel;
  username:string;
  roles:RoleModel[];
  updateUser:any;

  question:QuestionModel;

  rolesString:string="";

  showModal:boolean=false;
  showModal2:boolean=false;

  id:number;
  sifra:string;
  potvrSifra:string;
  name:string;
  surname:string;
  email:string;
  answers:any[]=[];


  ngOnInit(): void {
    this.username=localStorage.getItem("username");
    this.userService.getUserByUsername(this.username).subscribe(data =>{
      this.user = data;
      this.getRole();
      this.id=this.user.id;
      this.name=this.user.name;
      this.surname=this.user.surname;
      this.email=this.user.email;
      this.setAnsw(this.user.answers);
  });
  }

  setAnsw(answ){
    this.answers=answ;
    console.log(this.answers);
    console.log("ODGOVORII ");
  }
  pomocni:string;
  getRole(){
    this.roles=this.user.roles; 
    for(let role of this.roles){
      this.rolesString=this.rolesString+role.name+",";
    }

    localStorage.setItem("Role",this.rolesString);
    this.pomocni=localStorage.getItem("Role");
    console.log(this.user);
  }

  onModalClose(){
    this.showModal=false;
    this.showModal2=false;
  }

  onShowModal(){
    this.showModal=true;
  }
  onShowModal2(){
    this.showModal2=true;
  }

  setPswd(){
    if(this.sifra==undefined || this.sifra==null || this.sifra!=this.potvrSifra){
      alert("Niste unijeli dobre podatke");
    }
    else{
      this.updateUser={password: this.sifra};
      this.userService.updateUser(this.updateUser,this.user.id).subscribe(data=>{
        this.updateUser=data;
      })
      this.showModal=false;
    }
  }


   setUser(){
     if(this.username==undefined||this.name==undefined||this.surname==undefined||this.email==undefined||this.username==null||this.name==null||this.surname==null||this.email==null|| this.username==""|| this.name==""|| this.surname==""|| this.email==""){ alert("Niste unijeli dobre podatke");}
     else{
      this.updateUser={
        username: this.username,
        name: this.name,
        surname: this.surname,
        email: this.email
      };
      this.userService.updateUser(this.updateUser,this.user.id).subscribe(data=>{
        this.updateUser=data;
      })
      this.onModalClose();
    }

  }

}
