import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { CreateTodoComponent } from './create-todo/create-todo.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { EditTodoComponent } from './edit-todo/edit-todo.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { NgModule } from '@angular/core';

const routes: Routes=[
    {
        path:'',
        component:HomeComponent,
        children:[
            {
                path:'todo-list',
                component:TodoListComponent
            },
            {
                path:'create-todo',
                component:CreateTodoComponent
            },
            {
                path:'edit-todo',
                component:EditTodoComponent
            },
        ]
    },
    {
        path:'sign-in',
        component:SignInComponent
    },
    {
        path:'sign-up',
        component:SignUpComponent
    },
    {
        path:'**',
        component:NotFoundComponent
    }
];
@NgModule(
    {
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
    }
)

export class AppRoutingModule {
}