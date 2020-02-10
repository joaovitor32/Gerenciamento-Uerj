import { Component, OnInit } from '@angular/core';
import {ProfessorService} from '../../services/professor/professor.service';
import {TurmasService} from '../../services/turmas/turmas.service';
import {MatTableDataSource} from '@angular/material/table'; 
import { ActivatedRoute } from '@angular/router';
import {MatDialog} from '@angular/material';
import { AlertTurmaDeleteComponent } from './alert-turma-delete/alert-turma-delete.component';
import { CadastroTurmaComponent } from './cadastro-turma/cadastro-turma.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-turmas-professor',
  templateUrl: './turmas-professor.component.html',
  styleUrls: ['./turmas-professor.component.css']
})
export class TurmasProfessorComponent implements OnInit {

  idCurso:any;
  turmaProfessor=[]
  displayedColumns:string[]; 
  dataSource:MatTableDataSource<any>;
  token;
  constructor(
    private professorService:ProfessorService,
    private activeRoute:ActivatedRoute,
    private matDialog:MatDialog,
    private turmaService:TurmasService,
    private _snackBar:MatSnackBar
  ) { }

  ngOnInit() {
    this.token=localStorage.getItem('token');  
    this.carregarIdCurso();
    this.carregarTurmaProfessor(); 
  }
  atualizarTabelaTurma(){
    this.turmaProfessor=[];
    this.carregarTurmaProfessor();
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  carregarIdCurso(){
    this.activeRoute.queryParams.subscribe(params=>{
      this.idCurso=params['codCurso'];
    })
  }
  carregarTurmaProfessor(){
    this.turmaService.getTurmas(this.token).subscribe(turmasProfessor=>{
      if(turmasProfessor.length==0){
        this._snackBar.open("Não existem turmas cadastradas", null, {
          duration: 2000,
        });
      }else{
        for(let turmaProfessor of turmasProfessor){
          this.turmaProfessor.push(turmaProfessor);
        }
      }

      this.displayedColumns =['nome','periodo','nomeDisc','credito','ementa','operacoes'];
      this.dataSource=new MatTableDataSource(this.turmaProfessor);
    })
  }
  deleteTurma(codTurma){
    this.turmaService.deleteTurma(codTurma,this.token).subscribe(data=>{
      if(data!=null){
        let dialog=this.matDialog.open(AlertTurmaDeleteComponent,{
          data:{data:data,codTurma:codTurma},
        })
      }
    });
    this.atualizarTabelaTurma();
  }
  openCadastroTurmaDialog(){
    let dialog=this.matDialog.open(CadastroTurmaComponent,{
      width:"600px",

  
    });
    dialog.afterClosed().subscribe(()=>{
      this.atualizarTabelaTurma();
    })
  }
}
