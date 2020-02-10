import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {curso} from '../../interfaces/curso';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  url="/api/Controller/Curso.php"

  constructor(private http:HttpClient) { }

  getCurso(codCurso,token):Observable<curso>{
    let dados;
    dados={codCurso,action:'GET_CURSO'};
    return this.http.post<curso>(
      this.url,
      dados,
      {headers:{'Authorization':`Bearer ${token}`}}
    );
  }

  getAllCourses():Observable<curso[]>{
    return this.http.post<curso[]>(
      this.url,
      {action:"GET_CURSOS"},
    );
  }

  cadastrarCurso(form,token):Observable<curso>{
    form['action']="CADASTRAR_CURSO";
    return this.http.post<curso>(
      this.url,
      form,
      {headers:{'Authorization':`Bearer ${token}`}}
    );
  }
}
