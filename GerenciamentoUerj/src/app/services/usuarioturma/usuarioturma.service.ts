import { Injectable } from '@angular/core';
import {Observable, empty} from 'rxjs';
import {usuarioturma} from '../../interfaces/usuarioturma'
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioturmaService {

  url="/api/Controller/UsuarioTurma.php";;

  constructor(private http:HttpClient){}

  getTurmasUser(token):Observable<usuarioturma[]>{
    return this.http.post<usuarioturma[]>(this.url,
      {action:"GET_TURMASBYUSER"},
      {headers:{'Authorization':`Bearer ${token}`}}
    );
  }
  cadastrarUsuarioTurma(form,token):Observable<usuarioturma>{
    form['action']="CADASTRAR_USUARIO_TURMA";
    return this.http.post<usuarioturma>(
      this.url,
      form,
      {headers:{authorization:`Bearer ${token}`}}
    );
  }
  deleteUsuarioTurma(codTurma,codLogin,token):Observable<usuarioturma>{
    return this.http.post<usuarioturma>(
      this.url,
      {action:"DELETE_USUARIO_TURMA",codTurma:codTurma,codLogin:codLogin},
      {headers:{authorization:`Bearer ${token}`}}
    );
  }
}
