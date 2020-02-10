import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Usuario} from '../../interfaces/usuario'
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url='/api/Controller/Usuario.php';

  constructor(private http:HttpClient){}

  getUser(token):Observable<Usuario[]>{
    let data;
    data={action:'GET_USER'}
    return this.http.post<Usuario[]>(this.url,data,{headers:{'Authorization':`Bearer ${token}`}});
  }
  cadastroUser(fd):Observable<Usuario>{
    return this.http.post<Usuario>(
      this.url,
      fd,

    );
  }
  updateUser(fd,token):Observable<Usuario>{
    return this.http.post<Usuario>(
      this.url,
      fd,
      {headers:{authorization:`Bearer ${token}`}}
    );
  }
}
