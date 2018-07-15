import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToDoService } from '../todo.service';
import { User, Login } from '../ToDo.model';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  user: User;
  loggedInUser:Login;
  success;
  failure;
  constructor(private router:Router,
             private toDoService:ToDoService ) { }

  ngOnInit() {
    this.loggedInUser = new Login();
  }
  submitForm(loginForm:NgForm)
  {
    this.loggedInUser.userName = loginForm.value.userName;
    this.loggedInUser.password =loginForm.value.passWord;
    this.validateUser(this.loggedInUser);
  }
  validateUser(user:Login)
  {
    this.toDoService.validateUser(user)
    .subscribe((user)=> {
      this.loggedInUser = user;
      this.router.navigate(['/todo-list']);
      localStorage.setItem('user',JSON.stringify(this.loggedInUser));
    },
  (error)=>{
    this.failure="Create An Account.";
  });
  }
  signUp()
  {
    this.router.navigate(['/sign-up']);
  }
}
