import { Component, OnInit } from '@angular/core';
import {MatTableDataSource } from '@angular/material/table';
import {SidenavComponent} from '../../sidenav/sidenav.component';
import {disciplina} from '../../interfaces/disciplina';
import {DisciplinaService} from '../../services/disciplina/disciplina.service';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material';
import { ViewMateriaComponent } from '../view-materia/view-materia.component';
import {TabelaCadastroMateriaService} from '../../services/tabelaCadastroMateria/tabela-cadastro-materia.service'
import { AlertDeleteMateriaComponent} from './alert-delete-materia/alert-delete-materia.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-tabela-materia',
  templateUrl: './tabela-materia.component.html',
  styleUrls: ['./tabela-materia.component.css']
})
export class TabelaMateriaComponent implements OnInit {

  disciplinas:disciplina[]=[];
  displayedColumns:string[];
  idCurso;
  token;
  dataSource:MatTableDataSource<disciplina>;

  constructor(
    public sidenav:SidenavComponent,
    private disciplinaService:DisciplinaService,
    private activeRouter:ActivatedRoute,
    private matDialog:MatDialog,
    private tabCadMateria:TabelaCadastroMateriaService,
    private _snackBar:MatSnackBar
  ){}

  ngOnInit() {
    this.token=localStorage.getItem('token');
    this.carregarCurso();
    this.carregarDisciplinas();
    this.checkTabela();
  }
  async carregarCurso(){
    await this.activeRouter.queryParams.subscribe(params=>{
      this.idCurso=params['codCurso'];
    })
  }
  async carregarDisciplinas(){
    await this.disciplinaService.listaDisciplinasByCurso(this.token).subscribe(disciplinas=>{
      if(disciplinas.length==0){
        this._snackBar.open('Não existem disciplinas cadastradas', null, {
          duration: 2000,
        });
      }else{
        for(let disciplina of disciplinas){
          this.disciplinas.push(disciplina);
        }
      }
      this.displayedColumns=['nomeDisc','ementa','credito','operacoes'];
      this.dataSource= new MatTableDataSource(this.disciplinas);
    })
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  changeData(codDisciplina){
    let dialog=this.matDialog.open(ViewMateriaComponent,{
      width:"600px",
      maxHeight: '100vh',
      data:{codDisciplina:codDisciplina},
    })
    dialog.afterClosed().subscribe(()=>{
      this.atualizaTabelaDisciplina();
    })
  }
  atualizaTabelaDisciplina(){
      this.disciplinas=[];
      this.carregarDisciplinas();
  }
  checkTabela(){
    this.tabCadMateria.currentMessage.subscribe(message=>{
      if(message=="UPDATETABELA"){
        this.atualizaTabelaDisciplina();
        this.tabCadMateria.updateTabela("NAOATUALIZATABELA");
      }
    })
  }
  deleteDisciplina(codDisciplina){
    this.disciplinaService.deleteDisciplina(codDisciplina,this.token).subscribe(data=>{
      if(data!=null){
        let dialog=this.matDialog.open(AlertDeleteMateriaComponent,{
          data:{data:data,codDisciplina:codDisciplina}
        })
      }
    })
    this.atualizaTabelaDisciplina();
  }
}
