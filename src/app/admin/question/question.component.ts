import { Component, Injectable, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { LoginComponent } from 'src/app/login/login.component';
import { AnswerModel } from 'src/app/shared/models/answer.model';
import { QuestionModel } from 'src/app/shared/models/question.model';
import { UserModel } from 'src/app/shared/models/user.model';
import { AnswerService } from 'src/app/shared/services/answer.service';
import { QuestionService } from 'src/app/shared/services/question.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
    selector: 'app-admin',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.css']
  })
export class QuestionComponent implements OnInit{
    
    questions: QuestionModel[];
    answeredQ: QuestionModel[];
    unansweredQ: QuestionModel[];
    odg:boolean=true;


    showModal: boolean = false;
    showModal2: boolean = false;
    selectedQuestion:string;
    selectedAnswer:any[]=[];
    selectedQuest: QuestionModel;
    answ:string;
    fullAnswerObj: any;

    username:string;
    user:UserModel;

    constructor(private questionService: QuestionService,private authService: AuthService, private userService: UserService, private answerService: AnswerService){}

    ngOnInit(){
        this.getAll();
        this.username=localStorage.getItem("username");
        this.userService.getUserByUsername(this.username).subscribe(data =>{
            this.user = data;
        });
    }
    getAll(){
        this.questionService.getAnsweredQuestion().subscribe(data =>{
            this.answeredQ = data;
            this.questions=this.answeredQ;
        });
        this.questionService.getUnansweredQuestion().subscribe(data =>{
            this.unansweredQ = data;
        });
        
    
    }

    answeredQuestions(){
        document.getElementById("btn").style.left = "0px"
        document.getElementById("btn").style.width = "215px"
        this.questions=this.answeredQ;
        this.odg=true;
    }
    unansweredQuestions(){
        document.getElementById("btn").style.left = "210px"
        document.getElementById("btn").style.width = "225px"
        this.questions=this.unansweredQ;
        this.odg=false;
    }
    
    showAnswer(question,answers){
        this.selectedQuestion=question.content;
        //console.log(this.selectedQuestion);
        //console.log("ODGOVORI");
        for(let answer of answers){
          this.selectedAnswer.push(answer.content);
      }
       // console.log(this.selectedAnswer);
        this.showModal=true;
    }

    onAddAnswer(id,question){
        this.selectedQuestion=question.content;
        this.selectedQuest=question;
        this.showModal2=true;
        //console.log(question.content);
    }

    addAnswer(){
       this.fullAnswerObj={content:this.answ,
                            creator:this.user,
                            question:this.selectedQuest};
       this.answerService.storeAnswer(this.fullAnswerObj).subscribe(data=>{
            this.fullAnswerObj=data;
            this.getAll();
        });
       
       alert("Ogovor dodat");

        this.showModal2=false;
    }
    
    onModalClose(){
        this.showModal=false;
        this.showModal2=false;
        this.selectedAnswer=[];
        this.selectedQuestion=null;
    }

    
    onDeleteQuest(id){
        this.questionService.deleteQuestion(id).subscribe(data=>{});
        alert("Pitanje obrisano");
        this.getAll();

    }

}