import { Component, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/shared/models/category.model';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
    selector:'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{

    categories: any[];
    showModal: boolean = false;
    showModal2: boolean = false;
    id: number;
    name: string;
    description: string;
    category: CategoryModel;

    constructor(private categoryService:CategoryService){

    }

    ngOnInit(){
        this.getAll();
    }

    getAll(){
        this.categoryService.getAllCategories().subscribe(data =>{
            this.categories = data;
        });
    }

    onRemove(id){
        this.categoryService.deleteCategory(id).subscribe(()=>{
            console.log("deleted");
            this.getAll();
        })
    }

    onAdd(categoryForm){
        if(categoryForm.value.name===undefined || categoryForm.value.name==="" || categoryForm.value.description===undefined || categoryForm.value.description===""){
            alert("Unesite sva polja")
        }
        else{
            this.categoryService.storeCategory(categoryForm.value).subscribe(data =>{
                this.onModalClose();
                console.log("success!");
                this.getAll();
            });
        }
    }

    onUpdate(categoryForm,id){
            //console.log(categoryForm.value);
           // this.category.name=categoryForm.value.name;
           // this.category.description=categoryForm.value.description;
        
        this.categoryService.updateCategory(categoryForm.value,id).subscribe(data =>{
            this.onModalClose();
            console.log("success!");
            this.getAll();
        });
        

        
    }

    onShowModal(){
        this.showModal=true;
    }

    onShowModal2(id,name,desc){
        this.id=id;
        this.name=name;
        this.description=desc;
        this.showModal2=true;
    }

    onModalClose(){
        this.showModal=false;
        this.showModal2=false;
        this.name="";
        this.description="";
    }
    
}