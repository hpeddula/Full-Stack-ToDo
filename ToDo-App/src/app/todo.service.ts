import { Observable } from 'rxjs/Observable';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { ToDoItem,User,Login } from './ToDo.model';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class ToDoService {
    constructor(private dataService: DataService) { }
    toDoItem: ToDoItem;
    toDoItems: ToDoItem[];
    user:User;
    login:Login;
    ToDoListUpdated=new Subject<ToDoItem[]>();

    getAllToDos(): Observable<ToDoItem[]> {
        return this.dataService.get(`ToDo/GetAllToDoItems`)
            .map((toDoItems) => this.toDoItems = toDoItems);
    }
    getToDoById(id): Observable<ToDoItem> {
        return this.dataService.get(`ToDo/GetToDoItemById/${id}`)
            .map((toDoItem) => this.toDoItem = toDoItem);
    }
    createToDo(item: ToDoItem): Observable<ToDoItem> {
        return this.dataService.post(`ToDo/Create`, item)
            .map((toDoItem) => this.toDoItem = toDoItem);
    }
    updateToDo(id, item: ToDoItem): Observable<ToDoItem> {
        return this.dataService.put(`ToDo/Update/${id}`, item)
            .map((toDoItem) => this.toDoItem = toDoItem);
    }
    deleteToDo(id) {
        return this.dataService.delete(`ToDo/Delete/${id}`)
            .map(
                (toDoItem)=>{
                let index = this.toDoItems.findIndex((toDoItem)=> toDoItem.id === id);
                this.toDoItems.splice(index,1);
                this.emitToDoList();
                return toDoItem;
            });
    }
    emitToDoList()
    {
        this.ToDoListUpdated.next(this.toDoItems.slice());
    }
    getToDoByUserId(uid): Observable<ToDoItem[]> {
        return this.dataService.get(`Users/GetItemByUser/${uid}`)
            .map((toDoItems) => this.toDoItems = toDoItems);
    }
    createUser(login:Login):Observable<Login>
    {
        return this.dataService.post(`Users/CreateUser`,login)
            .map((login)=>this.login = login);
    }
    validateUser(user:Login):Observable<Login>
    {
        return this.dataService.post(`Users/ValidateUser`,user)
            .map((user)=>this.login = user);
    }
}