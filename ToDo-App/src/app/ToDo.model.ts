export class ToDoItem {
    id: number;
    name: string;
    isComplete:String;
    user: User;
    userId:number;
}
export class User {
    id: number;
    firstName: string;
    lastName: string;
    toDoItems: ToDoItem[];
}
export class Login {
    userName:string;
    password:string;
    userId:number;
    user:User;
}