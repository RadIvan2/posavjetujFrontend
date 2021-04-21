import { QuestionModel } from "./question.model";

export interface CategoryModel{
    id: number,
    name: string,
    description: string,
    questions?:QuestionModel[]
}