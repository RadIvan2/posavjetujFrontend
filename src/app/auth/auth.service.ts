import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {map} from 'rxjs/operators'
import { UserModel } from '../shared/models/user.model';

@Injectable()
export class AuthService{

    isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    authSubject= new BehaviorSubject<UserModel>(null);

    private currentUserSubject: BehaviorSubject<UserModel>;
    public currentUser: Observable<UserModel>;
    
    constructor(private http: HttpClient){}

    login(username,password){
        const data = {
            username:username,
            password:password
        };

        let headers= new HttpHeaders();
        headers.set('Content-Type', 'application/json');

        return this.http.post<any>('http://localhost:8080/authenticate/login', data, {headers:headers})
                    .pipe(map(responseData =>{
                        localStorage.setItem('token', responseData.token);
                        localStorage.setItem('username', data.username);
                        this.isAuthenticatedSubject.next(true);
                        return responseData;
                    }))
    }

    logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('Role');
        this.isAuthenticatedSubject.next(null);
    };
}