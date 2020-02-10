import { Component, OnInit, Inject, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import {disciplina} from '../../interfaces/disciplina';
import {CursoService} from '../../services/curso/curso.service';
import {Router} from '@angular/router';
import {DisciplinaService} from '../../services/disciplina/disciplina.service';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';

@Component({
  selector: 'app-view-materia',
  templateUrl: './view-materia.component.html',
  styleUrls: ['./view-materia.component.css']
})
export class ViewMateriaComponent implements OnInit {

  constructor(
      public dialogRef:MatDialogRef<ViewMateriaComponent>,
      @Inject(MAT_DIALOG_DATA) public data,
      public router:Router,
      public disciplinaService:DisciplinaService,
      public formBuilder:FormBuilder,
      private ref:ChangeDetectorRef,
      private cursoService:CursoService,
  ){}
  
  cursos=[];
  disciplina=[];
  idDisciplina=this.data.codDisciplina;
  formularioDados:FormGroup;
  token;

  ngOnInit(){
    this.token=localStorage.getItem('token');
    this.carregarCursos();
    this.configurarFormulario();
  }
  closeDialog(){
    this.dialogRef.close();
  }
  carregarCursos(){
    this.cursoService.getAllCourses().subscribe(cursos=>{
      for(let curso of cursos){
        this.cursos.push(curso);
      }
    })
  }
  configurarFormulario(){
    this.formularioDados=this.formBuilder.group({
      nomeDisc:[null,Validators.required],
      credito:[null,Validators.required],
      ementa:[null,Validators.required],
      codCurso:[null,Validators.required]
    })
  }
  changeData(){
    let dados:JSON;
    dados=this.formularioDados.value;
    dados['codDisciplina']=this.idDisciplina;
    dados['action']="CHANGEDATADISCIPLINA";
    this.disciplinaService.changeData(dados,this.token).subscribe();
    this.formularioDados.reset();
  }
}
