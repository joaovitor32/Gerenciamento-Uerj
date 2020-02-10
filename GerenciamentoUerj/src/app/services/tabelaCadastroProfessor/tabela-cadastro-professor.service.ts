import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabelaCadastroProfessorService {

  constructor() { }

  private messageUpdateTabela = new BehaviorSubject("default message");
  currentMessage=this.messageUpdateTabela.asObservable();
  updateTabela(message){
    this.messageUpdateTabela.next(message);
  }
}
