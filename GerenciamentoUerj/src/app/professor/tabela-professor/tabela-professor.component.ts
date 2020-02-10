import { Component, OnInit,OnChanges,EventEmitter,Input,Output } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SidenavComponent} from '../../sidenav/sidenav.component';
import {AlertDeleteComponent} from './alert-delete/alert-delete.component'
import {professor} from '../../interfaces/professor';
import {ProfessorService} from '../../services/professor/professor.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ViewProfessorComponent } from '../view-professor/view-professor.component';
import { CadastroProfessorComponent } from '../cadastro-professor/cadastro-professor.component';
import {TabelaCadastroProfessorService} from '../../services/tabelaCadastroProfessor/tabela-cadastro-professor.service'
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-tabela-professor',
  templateUrl: './tabela-professor.component.html',
  styleUrls: ['./tabela-professor.component.css']
})
export class TabelaProfessorComponent implements OnInit {

  professor:professor[]=[];
  displayedColumns: string[];
  idCurso;
  dataSource:MatTableDataSource<professor>;
  token;

  constructor(
    public sideNav:SidenavComponent,
    private professorService:ProfessorService,
    private activeRouter:ActivatedRoute,
    private matDialog:MatDialog,
    private tabCadProfessor:TabelaCadastroProfessorService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.token=localStorage.getItem('token');
    this.sideNav.activeView="Professor";
    this.carregarCurso();
    this.carregaProfessor();
    this.checkState();
  }

  carregarCurso(){
    this.activeRouter.queryParams.subscribe(params=>{
      this.idCurso=params['codCurso'];
    })
  }
  async carregaProfessor(){
    await this.professorService.listaDeProfessores(/*this.idCurso*/this.token).subscribe(professores=>{
      if(professores.length==0){
        this._snackBar.open("Não há professores cadastrados", null, {
          duration: 2000,
        });
      }else{
        for(let professor of professores){
          this.professor.push(professor);
        }
        let profs=this.professor;
        this.displayedColumns = ['Nome', 'GrandeArea','operacoes'];
        this.dataSource = new MatTableDataSource(profs);
      }
    })
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  changeData(codProfessor){
    let dialog=this.matDialog.open(ViewProfessorComponent,{ 
        width:"600px",
        data:{codProfessor:codProfessor},  
      }
    )
    dialog.afterClosed().subscribe(()=>
      { 
        this.professor=[];
        this.carregaProfessor();
      })
    }
    deleteProfessor(codProfessor){
      let codCurso=this.idCurso;
      this.professorService.deleteProfessor(codProfessor/*codCurso*/,this.token).subscribe(data=>{
         if(data!=null){
            let dialog=this.matDialog.open(AlertDeleteComponent,{
              data:{codProfessor:codProfessor,data:data},
            });
            dialog.afterClosed().subscribe(()=>
            { 
              this.professor=[];
              this.carregaProfessor();
            })
          }
          
      });
      this.atualizaTabelaProfessor();
    }

    atualizaTabelaProfessor(){
      this.professor=[];
      this.carregaProfessor();
    }

    checkState(){
      this.tabCadProfessor.currentMessage.subscribe(message=>{if(message=="UPDATETABELA"){
         this.atualizaTabelaProfessor();
         this.tabCadProfessor.updateTabela("NAOATUALIZATABELA");
      }})  
    }
  }
