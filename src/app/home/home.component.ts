import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { CategoryModel } from '../shared/models/category.model';
import { QuestionModel } from '../shared/models/question.model';
import { CategoryService } from '../shared/services/category.service';
import { QuestionService } from '../shared/services/question.service';

@Component({
    selector:'app-home',
    templateUrl:'./home.component.html',
    styleUrls:['./home.component.css']
})
export class HomeComponent implements OnInit{

    constructor(private categoryService: CategoryService, private questionService: QuestionService,@Inject(DOCUMENT) document){}

    categories: CategoryModel[];
    question: any;
    filteredCategory: CategoryModel;
    selectedCategoryId:number;

    id:number;

    showModal: boolean = false;
    isExpanded: boolean = false;

    category: CategoryModel=null;
    specCategory: CategoryModel;
    galeryAvailable: boolean = true;
    content: string;
    questionHasUsers:string;

    selectCategory:any;

    ngOnInit(){
        this.categoryService.getAllCategories().subscribe(da=>{
          this.categories = da;
        });
    }

    toggleDropdown(isExpanded){
        this.isExpanded=!isExpanded;
    }

    onShowModal(){
        this.showModal=true;
    }

    onModalClose(){
        this.galeryAvailable= true;
        this.content = undefined;
        this.showModal=false;
    }

    

    
    getCategorytById(id){        
        this.categoryService.getCategoryById(id).subscribe(data=>{
            this.selectCategory = data;            
        });
    }

    selected: number=0;
    selectedOption(category){
        this.getCategorytById(category);
    }

    onSend(){
        this.question={
            content:this.content,
            category:this.selectCategory
        }
        this.questionService.storeQuestion(this.question).subscribe(data=>{
            this.question=data;
        });
        alert("Uspjesno postavljeno pitanje!");
        this.onModalClose();
       
    }

   thisCategory(category){
       console.log(category);
   }
}