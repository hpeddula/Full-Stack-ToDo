import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToDoItem } from '../ToDo.model';
import { ToDoService } from '../todo.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { Overlay } from '@angular/cdk/overlay';
import { Router } from '@angular/router';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, OnDestroy {
  toDoItems: ToDoItem[];
  toDoItemSubscription: Subscription;
  finishedTasks: ToDoItem[];
  finishedTasksMsg = "";
  loading = true;
  dialogRef;
  userID;
  constructor(private todoService: ToDoService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public overlay: Overlay,
    private router: Router) { }

  ngOnInit() {
    var user1 = JSON.parse(localStorage.getItem("user"));
    this.todoService.getToDoByUserId(user1.userID)
      .subscribe(
        (toDoItems) => {
          this.toDoItems = toDoItems;
          this.loading = false;
        },
        (error) => {
          console.log(error)
        });
    this.todoService.getFinishedTasks(user1.userID)
      .subscribe((items) => { this.finishedTasks = items },
        (error) => { this.finishedTasksMsg ="Sorry We Could Not fetch your Finished Tasks." });
    this.toDoItemSubscription = this.todoService.ToDoListUpdated
      .subscribe((toDoItems) => this.toDoItems = toDoItems);
  }
  onDelete(delRef) {
    this.dialogRef = this.dialog.open(delRef, {
      width: '400px',
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      panelClass: "panel-class"
    })
  }
  closeDialog() {
    this.dialogRef.close();
  }
  deleteToDo(id: number, status: boolean, deleteTodo) {
    if (status === true) {
      this.todoService.deleteToDo(id)
        .subscribe(() =>
          this.openSnackBar('Success!', `Item with Id:${id} has been deleted`));
    }
    else {
      this.onDelete(deleteTodo);
    }

  }
  deleteItem(id) {
    this.todoService.deleteToDo(id)
      .subscribe(() =>
        this.openSnackBar('Success!', `Item with Id:${id} has been deleted`))
    this.dialogRef.close();
  }
  create() {
    this.router.navigate(['/create-todo']);
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action,
      {
        direction: 'ltr',
        duration: 2000
      });
  }
  ngOnDestroy() {
    if (this.toDoItemSubscription) {
      this.toDoItemSubscription.unsubscribe();
    }
  }
}
