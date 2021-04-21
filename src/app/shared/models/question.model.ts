import { AnswerModel } from "./answer.model";
import {CategoryModel} from "./category.model"
export interface QuestionModel{
    id: number,
    content: string,
    createdAt: Date,
    answered: boolean;
    galeryAvailable: boolean;
    category?: CategoryModel;
    answers?:AnswerModel[];
}