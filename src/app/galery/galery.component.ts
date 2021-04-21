import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../shared/services/category.service';
import { QuestionService } from '../shared/services/question.service';
import { CategoryModel } from '../shared/models/category.model';
import { QuestionModel } from '../shared/models/question.model';

@Component({
  selector: 'app-galery',
  templateUrl: './galery.component.html',
  styleUrls:['./galery.component.css']
})
export class GaleryComponent implements OnInit{

  questions: QuestionModel[];
  answeredQuestions: QuestionModel[]=[];
  categories: CategoryModel[];
  filteredCategory: CategoryModel;
  id: number;

  selectedAnswer:any[]=[];
  selectedQuestion:string;

  showModal: boolean = false;

  constructor(private questionService: QuestionService, private categoryService: CategoryService){}

  ngOnInit(){
    this.questionService.getAnsweredQuestion().subscribe(data =>{
        this.questions = data;
    });
    
    this.categoryService.getAllCategories().subscribe(da=>{
      this.categories = da;
    });
  }

  onShowModal(){
    this.showModal=true;
  }

  isExpanded: boolean = false;
  toggleDropdown(isExpanded){
    this.isExpanded=!isExpanded;
  }  

  getAllQuest(){
    this.questionService.getAnsweredQuestion().subscribe(data =>{
      this.questions = data;
  });
  console.log(this.questions);
  //this.answeredQuestions=this.getAnsweredQuest(this.questions);
  }
/*
  getAnsweredQuest(questions){
    this.answeredQuestions=[];
    console.log("answquest" + this.answeredQuestions+ "pocetno");
    this.questions=questions;
    //console.log(this.questions);
    for(let question of questions){
      //console.log(question.answers);
      if(question.answers.length > 0){
      //console.log(question.answers);
      this.answeredQuestions.push(question);
      }
    }
    console.log(this.answeredQuestions);
    return questions;
  }*/

  getQuestByCat(id){
    this.questionService.getAnsweredQuestionsByCategoryID(id).subscribe(data =>{
      this.questions = data;
  });
  }
  /*getQuestByCat(id){
    this.filteredCategory=this.categories.find(category => category.id == id);
    this.questions=this.filteredCategory.questions;
    //console.log(this.questions);
    //console.log(id, this.filteredCategory, this.questions);
   // console.log(this.questions);
    this.id=id;
    //this.getAnsweredQuest(this.questions);
    return this.questions;
    //return this.categories.find(category => category.id == id);
  }*/

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

  onModalClose(){
    this.showModal=false;
    this.selectedAnswer=[];
    this.selectedQuestion=null;
}
  
}
