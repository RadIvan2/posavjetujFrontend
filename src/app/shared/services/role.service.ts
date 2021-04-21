import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RoleService{
    constructor(private http: HttpClient){}

    getAllRoles(){
        const url =  'http://localhost:8080/api/role';
        let headers = new HttpHeaders();
        headers.set('Content-type', 'application/json');
        return this.http.get<any>(url,{headers:headers});
    }
}