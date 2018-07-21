import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    var user1 = JSON.parse(localStorage.getItem("user"));
    if(user1)
    {
      this.router.navigate(['']);
    }
    else
    {
      this.router.navigate(['/sign-in']);
    }
  }
  
}
