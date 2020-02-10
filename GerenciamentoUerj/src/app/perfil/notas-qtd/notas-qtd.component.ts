import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UsuarioturmaService } from 'src/app/services/usuarioturma/usuarioturma.service';
import { ActivatedRoute } from '@angular/router';
import {BehaviorSubject,Observable} from 'rxjs'
import { PerfilService } from 'src/app/services/pefil/perfil.service';

@Component({
  selector: 'app-notas-qtd',
  templateUrl: './notas-qtd.component.html',
  styleUrls: ['./notas-qtd.component.css']
})
export class NotasQtdComponent implements OnInit {

  codUser;
  
  ma7: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  token;

  public doughnutChartLabels;
  public doughnutChartData;
  public doughnutChartType;

  constructor(
    private usuarioturma:UsuarioturmaService,
    private activatedRoute:ActivatedRoute,
    private perfilService:PerfilService
  ) {
   }

  ngOnInit() {
    this.token=localStorage.getItem('token');
    this.loadCodUser();
    this.loadChart();
    this.checkState();
    this.loadValuesChart();
  }
  checkState(){
    this.perfilService.currentMessageCalendario.subscribe(message=>{
      if(message=="UPDATE_CALENDARIO"){
        this.loadValuesChart();
        this.perfilService.updateCalendario("NAO_ATUALIZA_CALENDARIO");
      }
    })
  }
  loadChart(){
    this.doughnutChartLabels = ['Notas menores que 7','Notas maiores que 7', 'Notas iguais a 7'];
    this.doughnutChartData = [0, 0,0]; 
    this.doughnutChartType = 'doughnut';
  }
  loadValuesChart(){
    this.usuarioturma.getTurmasUser(this.token).subscribe(userTurmas=>{
      let ma7=0,me7=0,eq7=0;
      for(let ut of userTurmas){
        if(parseFloat(ut.media.toString())>7.0){
          ma7=ma7+1;
        }else if(parseFloat(ut.media.toString())<7.0){
          me7=me7+1;
        }else{
          eq7=eq7+1;
        }
      }
      this.doughnutChartData = [me7, ma7,eq7]; 
    });
  }
  loadCodUser(){
    this.activatedRoute.queryParams.subscribe(params=>{
      this.codUser=params["codLogin"];
    })
  }
}
