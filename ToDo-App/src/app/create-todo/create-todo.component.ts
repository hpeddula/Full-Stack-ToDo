import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToDoService } from '../todo.service';
import { ToDoItem } from '../ToDo.model';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.css']
})
export class CreateTodoComponent implements OnInit {
  userId: number;
  toDoItem: ToDoItem;
  constructor(
    private toDoService: ToDoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.userId = this.route.snapshot.queryParams["userId"];
    this.toDoItem = new ToDoItem();
    if(this.userId)
    {
      this.toDoItem.userId = this.userId;
    }
    var user1=JSON.parse(localStorage.getItem("user"));
    this.toDoItem.userId = user1.userID;
  }
  submitForm(MyForm: NgForm) {
    this.toDoItem.name = MyForm.value.taskName;
    this.toDoItem.isComplete = MyForm.value.status;
    this.createToDoItem(this.toDoItem);
  }
  createToDoItem(item: ToDoItem) {
    this.toDoService.createToDo(item)
      .subscribe((toDoItem) => {
        this.toDoItem = toDoItem;
        this.router.navigate(['/todo-list']);
      });
  }
}
