import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CategoryComponent } from './admin/category/category.component';
import { QuestionComponent } from './admin/question/question.component';
import { UserComponent } from './admin/user/user.component';

import { AuthGuard } from './auth/auth.guard';
import { UserAuthGuard } from './auth/userauth.guard';
import { GaleryComponent } from './galery/galery.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path: 'pocetna', component: HomeComponent},
  {path: 'galerija', component: GaleryComponent},
  {path: 'ulogujse', component: LoginComponent},
  {path: 'profil', component: ProfileComponent, canActivate: [AuthGuard]},
  {
    path: 'admin', 
    component: AdminComponent, canActivate: [UserAuthGuard], data:{role:["ROLE_ADMIN",'ROLE_SUPERVISOR']},
    children:[
      {path: 'kategorija',component: CategoryComponent, canActivate: [UserAuthGuard], data:{role:['ROLE_SUPERVISOR',"ROLE_ADMIN"]}},
      {path: 'korisnik',component: UserComponent, canActivate: [UserAuthGuard], data:{role:["ROLE_ADMIN"]}},
      {path: 'pitanje',component: QuestionComponent, canActivate: [UserAuthGuard], data:{role:['ROLE_SUPERVISOR']}}
    ]
  },
  {path:'**',redirectTo:'pocetna'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
