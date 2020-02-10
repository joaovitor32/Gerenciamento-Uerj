import { Component, OnInit,ViewChild,Directive,ElementRef,HostListener} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { UsuarioturmaService } from '../../services/usuarioturma/usuarioturma.service';
import {Subject,Observable} from 'rxjs' 
import { PerfilService } from 'src/app/services/pefil/perfil.service';

@Component({
  selector: 'app-cr',
  templateUrl: './cr.component.html',
  styleUrls: ['./cr.component.css']
})


export class CrComponent implements OnInit {
 
  codLogin;
  credito=0;
  mediaCredito=0;
  cr:any = 0;
  token;
  alturaContainerCr:number;
  alturaScroll:number;
  
  @ViewChild('crContainer',{static:true}) crContainer:ElementRef;
  
  constructor(
    private activateRoute:ActivatedRoute,
    private usuarioTurmaService:UsuarioturmaService,
    private perfilService:PerfilService
  ) { }

  ngOnInit() {
    this.token=localStorage.getItem('token');
    this.carregarIdUser();
    this.startCr();
    this.checkStateNewValuesCr();
    this.checkStateEffect();
  }

  carregarIdUser(){
    this.activateRoute.queryParams.subscribe(params=>{
      this.codLogin=params['codLogin'];
    })
  }
 carregarCr(){
    let credito=0;
    let creditoMedia=0;

    return new Promise(resolve=>{
      this.usuarioTurmaService.getTurmasUser(this.token).subscribe(notas=>{
        for(let nota of notas){
         credito+=parseFloat(nota.credito.toString());
         creditoMedia+=parseFloat(nota.credito.toString())*parseFloat(nota.media.toString())
        };
        resolve((creditoMedia/credito).toFixed(3));
      })
    })
  }
  
  checkStateNewValuesCr(){
    this.perfilService.currentMessageCr.subscribe(message=>{
      if(message=="UPDATE_CR"){
        this.carregarCr().then(data=>this.setCr(data));
        this.perfilService.updateCr("NAO_UPDATE_CR");
      }
    })
  }
  checkStateEffect(){
    this.perfilService.currentAlturaEffect.subscribe(effect=>{
      if(effect=="ACTIVATE_EFFECT"){
        this.effectsCr();
        this.perfilService.activateEffectCr("DONT_ACTIVATE_EFFECT");
      }
    })
  }
  effectsCr(){
    let maxValue=this.cr;
    let iterated=0;
    this.cr=0;
    setInterval(()=> {
      if(this.cr<maxValue){ 
        iterated+=0.05
        this.cr=iterated.toPrecision(3);
    
      }else{
        maxValue=0;
      }
    }, 10);
  }

  setCr(cr){
    if(isNaN(cr)){
      this.cr=0;
    }else{
      this.cr=cr;
    }
  } 
  startCr(){
    this.carregarCr().then(data=>this.setCr(data));
  } 
}

