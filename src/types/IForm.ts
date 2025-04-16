import { IComments } from "./IComments";

export type CommentFormData = Pick<IComments, 'name' | 'email' | 'body'>;

export interface LoginFormData {
    username: string;
    password: string;
}