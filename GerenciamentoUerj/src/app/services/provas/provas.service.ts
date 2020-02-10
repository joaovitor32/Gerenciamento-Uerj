import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {provas} from '../../interfaces/provas';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProvasService {

  url="/api/Controller/Provas.php";

  constructor(
    private http:HttpClient,
  ) { }
  getProvas(token):Observable<provas[]>{
    let form;
    form={action:'GET_PROVAS'};
    return this.http.post<provas[]>(
      this.url,
      form,
      {headers:{authorization:`Bearer ${token}`}}
    );
  }
  cadastrarProva(form,token):Observable<provas>{
    form['action']="CADASTRAR_PROVA";
    return this.http.post<provas>(
      this.url,
      form,
      {headers:{authorization:`Bearer ${token}`}}
    );
  }
  deleteProvas(form,token):Observable<provas>{
    form['action']="DELETE_PROVAS";
    return this.http.post<provas>(
      this.url,
      form,
      {headers:{authorization:`Bearer ${token}`}}
    );
  }
}
