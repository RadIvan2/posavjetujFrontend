import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService{
    constructor(private http: HttpClient){}

    getAllUsers(){
        const url =  'http://localhost:8080/api/user';
        let headers = new HttpHeaders();
        headers.set('Content-type', 'application/json');
        return this.http.get<any>(url,{headers:headers});
    }

    getUserByUsername(username){
        const url =  'http://localhost:8080/api/user/'+`${username}`;
        let headers = new HttpHeaders();
        headers.set('Content-type', 'application/json');
        return this.http.get<any>(url,{headers:headers});
    }

    deleteUser(id){
        const url =  'http://localhost:8080/api/user/'+`${id}`;
        let headers = new HttpHeaders();
        headers.set('Content-type', 'application/json');
        return this.http.delete(url,{headers:headers});
    }

    updateUser(user,id){
        const url = 'http://localhost:8080/api/user/'+`${id}`;
        let headers = new HttpHeaders;
        headers.set('Content-type', 'application/json');
        return this.http.put<any>(url,user,{headers:headers});
    }

    storeUser(user){
        const url = 'http://localhost:8080/api/user';
        let headers = new HttpHeaders();
        headers.set('Content-type', 'application/json');
        return this.http.post<any>(url, user, {headers: headers});
    }
}