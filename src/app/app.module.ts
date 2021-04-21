import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component'; 
import { GaleryComponent } from './galery/galery.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth/auth.service';
import { JwtInterceptor } from './auth/jwt.interceptor';
import { ErrorInterceptor } from './auth/error.interceptor';
import { AdminComponent } from './admin/admin.component';
import { QuestionComponent } from './admin/question/question.component';
import { QuestionService } from './shared/services/question.service';
import { CategoryService } from './shared/services/category.service';
import { CategoryComponent } from './admin/category/category.component';
import { CommonModule } from '@angular/common';
import { UserComponent } from './admin/user/user.component';
import { UserService } from './shared/services/user.service';
import { RoleService } from './shared/services/role.service';
import { AnswerService } from './shared/services/answer.service';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent, 
    GaleryComponent,
    LoginComponent,
    AdminComponent,
    QuestionComponent,
    CategoryComponent,
    UserComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  providers: [
    QuestionService,
    CategoryService,
    UserService,
    AuthService,
    RoleService,
    AnswerService,
    { provide: HTTP_INTERCEPTORS,useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS,useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
