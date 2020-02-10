import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor() { }

  private messageUpdateTabela= new BehaviorSubject('Default message');
  private messageUpdateCalendario= new BehaviorSubject('Default message');
  private messageUpdateCr=new BehaviorSubject("Default message");
  private messageAlturaCrEffect=new BehaviorSubject('Default Message');

  currentMessage=this.messageUpdateTabela.asObservable();
  updateTabela(message){
    this.messageUpdateTabela.next(message);
  } 

  currentMessageCalendario=this.messageUpdateCalendario.asObservable();
  updateCalendario(message){
    this.messageUpdateCalendario.next(message);
  }

  currentMessageCr=this.messageUpdateCr.asObservable();
  updateCr(message){
    this.messageUpdateCr.next(message);
  }

  currentAlturaEffect=this.messageAlturaCrEffect.asObservable();
  activateEffectCr(message){
    this.messageAlturaCrEffect.next(message);
  }
}
