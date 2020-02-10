import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TurmasService {

  url="/api/Controller/Turmas.php";

  constructor(
    private http:HttpClient,
  ) { }

  getTurmas(token):Observable<any[]>{
    let form;
    form={action:"GETTURMAS"}
    return this.http.post<any[]>(
      this.url,
      form,
      {headers:{authorization:`Bearer ${token}`}}
    );
  }
  deleteTurma(codTurma,token):Observable<any>{
    let form;
    form={codTurma,action:"DELETETURMA"}
    return this.http.post<any>(
      this.url,
      form,
      {headers:{authorization:`Bearer ${token}`}}
    );
  }
  cadastrarTurma(form,token):Observable<any>{
    form['action']="CADASTRAR_TURMA";
    return this.http.post<any>(
      this.url,
      form,
      {headers:{authorization:`Bearer ${token}`}}
    );
  }
  eraseTurma(codTurma,token):Observable<any>{
    let data;
    data={action:"ERASETURMA",codTurma};
    return this.http.post<any>(
      this.url,
      data,
      {headers:{authorization:`Bearer ${token}`}}
    );
  }
}
