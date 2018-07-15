import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ToDoItem } from '../ToDo.model';
import { ToDoService } from '../todo.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css']
})
export class EditTodoComponent implements OnInit {
  toDoItem:ToDoItem;
  id:number;
  constructor(
    private route:ActivatedRoute,
    private toDoService:ToDoService,
    private router:Router,

  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.queryParams['itemId'];
    this.toDoService.getToDoById(this.id)
    .subscribe((item)=>{
      this.toDoItem = item;
      this.populateTaskData(item);
    });
  }
  populateTaskData(item:ToDoItem)
{
  this.toDoItem.name = item.name;
  this.toDoItem.isComplete = String(item.isComplete);
}
updateToDoItem(item:ToDoItem)
{
  this.toDoService.updateToDo(item.id,item)
  .subscribe((item)=>this.toDoItem = item);
  this.router.navigate(['/todo-list']);
}
submitForm(MyForm:NgForm)
  {
    this.toDoItem.name = MyForm.value.taskName;
    this.toDoItem.isComplete = MyForm.value.status;
    this.updateToDoItem(this.toDoItem);
  }
}
