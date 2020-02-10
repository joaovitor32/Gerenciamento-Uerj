import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {professor} from '../../interfaces/professor';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  url="/api/Controller/Professor.php";
 

  constructor(private http:HttpClient){}

  listaDeProfessores(token):Observable<professor[]>{
    return this.http.post<professor[]>(
      this.url,
      {action:"LISTA_PROFESSORESBYCURSO"},
      {headers:{Authorization:`Bearer ${token}`}}  
    );
  }
  professorById(codProfessor,token):Observable<professor>{
    return this.http.post<professor>(
      this.url,
      {action:'PROFESSOR_BYID',codProfessor:codProfessor},
      {headers:{Authorization:`Bearer ${token}`}}
    );
  }
  updateProfessor(data,token):Observable<professor>{
    return this.http.post<professor>(
      this.url,
      data,
      {headers:{authorization:`Bearer ${token}`}}
    );
  }
  cadastroProfessor(dados,token):Observable<professor>{
    dados['action']="CADASTROPROFESSOR";
    return this.http.post<professor>(
      this.url,
      dados,
      {headers:{authorization:`Bearer ${token}`}}
    );
  }
  deleteProfessor(codProfessor,token):Observable<professor>{
    let dados;
    dados={codProfessor,action:'DELETEPROFESSOR'};
    return this.http.post<professor>(
      this.url,
      dados,
      {headers:{Authorization:`Bearer ${token}`}}
    );
  }
  eraseProfessor(codProfessor,token):Observable<professor>{
    let dados;
    dados={codProfessor,action:'ERASEPROFESSOR'};
    return this.http.post<professor>(
      this.url,
      dados,
      {headers:{Authorization:`Bearer ${token}`}},
    )
  }
}