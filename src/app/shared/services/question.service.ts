import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class QuestionService{

    constructor(private http: HttpClient){}

    getAllQuestions(){
        const url =  'http://localhost:8080/api/question';
        let headers = new HttpHeaders();
        headers.set('Content-type', 'application/json');
        return this.http.get<any>(url,{headers:headers});
    }

    getUnansweredQuestion(){
        const url =  'http://localhost:8080/api/question/unanswered';
        let headers = new HttpHeaders();
        headers.set('Content-type', 'application/json');
        return this.http.get<any>(url,{headers:headers});
    }

    getAnsweredQuestion(){
        const url =  'http://localhost:8080/api/question/answered';
        let headers = new HttpHeaders();
        headers.set('Content-type', 'application/json');
        return this.http.get<any>(url,{headers:headers});
    }

    
    getAnsweredQuestionsByCategoryID(id){
        const url =  'http://localhost:8080/api/question/answered-and-category-'+`${id}`;
        //console.log(url);
        let headers = new HttpHeaders();
        headers.set('Content-type', 'application/json');
        return this.http.get<any>(url,{headers:headers});
    }

    getQuestionsByAnswerId(id){
        const url =  'http://localhost:8080/api/question/answer-'+`${id}`;
        let headers = new HttpHeaders();
        headers.set('Content-type', 'application/json');
        return this.http.get<any>(url,{headers:headers});
    }

    storeQuestion(question){
        const url = 'http://localhost:8080/api/question';
        let headers = new HttpHeaders();
        headers.set('Content-type', 'application/json');
        console.log(question);
        return this.http.post<any>(url, question, {headers: headers});
    }

    deleteQuestion(id){
        const url =  'http://localhost:8080/api/question/'+`${id}`;
        let headers = new HttpHeaders();
        headers.set('Content-type', 'application/json');
        return this.http.delete(url,{headers:headers});
    }



}