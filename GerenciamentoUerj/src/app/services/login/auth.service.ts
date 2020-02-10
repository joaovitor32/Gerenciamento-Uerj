import { Injectable } from '@angular/core';
import {Usuario} from "../../interfaces/usuario";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedInStatus=false;

  url="/api/Controller/Login.php";

  constructor(private http:HttpClient,private router:Router) { }
  
  setLoggedIn(value:boolean){
    this.loggedInStatus=value;
  }
  logout(){
    localStorage.clear();
    return this.http.post<any[]>(this.url,{action:"LOGOUT"})
  }
  fazerLogin(formJson):Observable<any>{
    return this.http.post<any>(this.url,formJson,{headers:{'Authorization': '*'}})
  }
}
