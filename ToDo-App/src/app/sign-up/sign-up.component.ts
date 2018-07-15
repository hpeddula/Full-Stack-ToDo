import { Component, OnInit } from '@angular/core';
import { ToDoService } from '../todo.service';
import { Login, User } from '../ToDo.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  login: Login;
  user: User;
  errorMesg;
  constructor(private toDoService: ToDoService,
    private router: Router) { }

  ngOnInit() {
    this.login = new Login();
    this.login.user = new User();

  }
  submitForm(MyForm: NgForm) {
    this.login.userName = MyForm.value.userName;
    this.login.password = MyForm.value.passWord;
    this.login.user.firstName = MyForm.value.firstName;
    this.login.user.lastName = MyForm.value.lastName;
    this.createNewUser(this.login);
  }
  createNewUser(user: Login) {
    this.toDoService.createUser(user)
      .subscribe((user) => {
        console.log(user)
      }, (error) => {
        if (error.status == "404") {
          this.errorMesg = "User Already Exists.Create a Non Existent User."
        }
        else {
          this.router.navigate(['/sign-in']);
        }
      });
  }

}
