import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AnswerService{

    constructor(private http: HttpClient){}

    storeAnswer(answer){
        const url = 'http://localhost:8080/api/answer'
        let headers = new HttpHeaders();
        headers.set('Content-type', 'application/json');
        console.log(answer);
        return this.http.post<any>(url, answer, {headers: headers});
    }
}