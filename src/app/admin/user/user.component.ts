import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleModel } from 'src/app/shared/models/role.model';
import { UserModel } from 'src/app/shared/models/user.model';
import { RoleService } from 'src/app/shared/services/role.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
    selector:'app-category',
    templateUrl:'./user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

    users: UserModel[];
    roles: any[];
    role: string="";
    allRoles:RoleModel[];
    selectedRoles:RoleModel[]=[];

    selectedUser: UserModel;
    selectedUsername:string;

    showModal:boolean=false;
    showModal2:boolean=false;
    checked:boolean=false;

    updatedUser:UserModel;

    username:string;
    name:string;
    password:string;
    surname:string;
    email:string;
    isChecked:boolean;

    ukupno:number;

    constructor(private userService: UserService, private roleService: RoleService,private router:Router){}
    ngOnInit(){
        this.getAll();
        this.roleService.getAllRoles().subscribe(data=>{
            this.allRoles=data;
            this.ukupno=this.allRoles.length;
        })
    }

    getAll(){
        this.userService.getAllUsers().subscribe(data=>{
            this.users=data;
            //console.log(data);
        })
    }

    onRemove(id){
        this.userService.deleteUser(id).subscribe(()=>{
            this.getAll();
        });
        alert("Korisnik obrisan");
    }

    getUserRoles(user){
        this.role="";
        //console.log(user.roles);

        for(let role of user.roles){
            this.role=this.role+role.name.replace('ROLE_','')+", ";
            this.checked=true;
        }
       // console.log(this.role);
        return this.role;
    }
    onModalClose(){
        this.showModal=false;
        this.showModal2=false;
  }
  onShowModal(user){
      this.selectedUser=user; 
      this.getUserRoles(user);
      this.selectedUsername=this.selectedUser.username;
      this.showModal=true;
    }

    onAddUser(){
        this.showModal2=true;
    }

    addUser(userForm){
        this.userService.storeUser(userForm.value).subscribe(data=>{
            this.getAll()
        })
        alert("Korisnik dodat");
        this.onModalClose();
    }

    isClicked(role){
        console.log(role);
        this.selectedRoles.push(role);
        console.log(this.selectedRoles);
    }

    saveUser(){
        this.updatedUser={
            roles: this.selectedRoles
        }
        this.userService.updateUser(this.updatedUser,this.selectedUser.id).subscribe(data=>{
            this.updatedUser=data;
            console.log(this.updatedUser);
        this.getAll();
        });
        this.onModalClose();
        this.selectedRoles=[];
        alert("Uloga korisnika promjenjena");
    }
}
    

    
  