import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs-compat';
import { environment } from '../environments/environment';
import { error } from 'util';
import { ToDoItem } from './ToDo.model';
@Injectable()
export class DataService {
    constructor(private http: HttpClient) { }
    get(url) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin':'*'});
        return this.http.get<any>(`${environment.apiURL}/${url}`, { headers })
            .catch((error) => Observable.throw(error));
    }
   
    
    post(url, body) {
        let bodyString = JSON.stringify(body);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<any>(`${environment.apiURL}/${url}`, bodyString, { headers })
        .catch((error) => Observable.throw(error));
    }
    put(url, body) {
        let bodyString = JSON.stringify(body);
        let headers = new HttpHeaders({'Content-Type':'application/json'});
        return this.http.put<any>(`${environment.apiURL}/${url}`,bodyString,{headers})
        .catch((error) => Observable.throw(error));
    }
    delete(url){
        let headers = new HttpHeaders({'Content-Type':'application/json'});
        return this.http.delete(`${environment.apiURL}/${url}`,{headers})
        .catch((error) => Observable.throw(error));
    }
}