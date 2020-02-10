import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {disciplina} from '../../interfaces/disciplina';
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {

  url="/api/Controller/Disciplina.php";

  constructor(private http:HttpClient){}

  listaDisciplinasByCurso(token):Observable<disciplina[]>{

    return this.http.post<disciplina[]>(
      this.url,
      {action:"DISCIPLINAS_BYCURSO"},
      {headers:{'authorization':`Bearer ${token}`}}
    );
  }
  changeData(form,token):Observable<disciplina[]>{
    return this.http.post<disciplina[]>(
      this.url,
      form,
      {headers:{'authorization':`Bearer ${token}`}}
    );
  }
  cadastroDisciplina(form,token):Observable<disciplina>{
    form['action']="CADASTRARDISCIPLINA";
    return this.http.post<disciplina>(
      this.url,
      form,
      {headers:{authorization:`Bearer ${token}`}}
    );
  }
  deleteDisciplina(codDisciplina,token):Observable<disciplina>{
    let form;
    form={codDisciplina:codDisciplina,action:"DELETADISCIPLINA"}
    return this.http.post<disciplina>(
      this.url,
      form,
      {headers:{authorization:`Bearer ${token}`}}
    );
  }
  eraseDisciplina(codDisciplina,token):Observable<disciplina>{
    return this.http.post<disciplina>(
      this.url,
      {codDisciplina,action:"ERASEDISCIPLINA"},
      {headers:{authorization:`Bearer ${token}`}}
    )
  }
}
