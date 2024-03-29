import { AnswerModel } from "./answer.model";
import { RoleModel } from "./role.model";

export interface UserModel{
    id?: number,
    username?: string,
    password?:string,
    name?: string,
    surname?: string,
    email?: string,
    answers?:AnswerModel[];
    roles:RoleModel[];
}