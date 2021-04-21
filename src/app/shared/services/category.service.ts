import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoryService{

    constructor(private http: HttpClient){}

    getAllCategories(){
        const url =  'http://localhost:8080/api/category';
        let headers = new HttpHeaders();
        headers.set('Content-type', 'application/json');
        return this.http.get<any>(url,{headers:headers});
    }

    getCategoryById(id){
        const url =  'http://localhost:8080/api/category/'+`${id}`;
        let headers = new HttpHeaders();
        headers.set('Content-type', 'application/json');
        return this.http.get<any>(url,{headers:headers});
    }

    deleteCategory(id){
        const url =  'http://localhost:8080/api/category/'+`${id}`;
        let headers = new HttpHeaders();
        headers.set('Content-type', 'application/json');
        return this.http.delete(url,{headers:headers});
    }

    storeCategory(category){
        const url =  'http://localhost:8080/api/category';
        let headers = new HttpHeaders();
        headers.set('Content-type', 'application/json');
        return this.http.post<any>(url,category,{headers:headers});
    }

    updateCategory(category,id){
        const url =  'http://localhost:8080/api/category/'+`${id}`;
        let headers = new HttpHeaders();
        headers.set('Content-type', 'application/json');
        return this.http.put<any>(url,category,{headers:headers});
    }

    
    
}