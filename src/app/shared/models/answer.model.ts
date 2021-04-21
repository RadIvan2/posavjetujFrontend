import { QuestionModel } from "./question.model";
import { UserModel } from "./user.model";

export interface AnswerModel{
    id: number,
    content: string,
    createdAt: Date,
    aproved: boolean;
    questionId: QuestionModel;
    creatorId: UserModel;
}