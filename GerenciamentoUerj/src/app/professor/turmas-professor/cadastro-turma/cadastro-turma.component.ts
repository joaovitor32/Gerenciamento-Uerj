import { Component, OnInit } from '@angular/core';
import {ProfessorService} from '../../../services/professor/professor.service'
import {professor} from '../../../interfaces/professor'
import {ActivatedRoute} from '@angular/router';
import {FormGroup,FormBuilder,Validators} from '@angular/forms'
import { MatDialogRef,MatSnackBar } from '@angular/material';
import {DisciplinaService} from '../../../services/disciplina/disciplina.service'
import {disciplina} from '../../../interfaces/disciplina'
import { TurmasService } from 'src/app/services/turmas/turmas.service';

@Component({
  selector: 'app-cadastro-turma',
  templateUrl: './cadastro-turma.component.html',
  styleUrls: ['./cadastro-turma.component.css']
})
export class CadastroTurmaComponent implements OnInit {

  codCurso;
  professores:professor[]=[];
  disciplinas:disciplina[]=[];
  formularioDados:FormGroup;
  submitted=false;
  token;

  constructor(
    private professorService:ProfessorService,
    private activatedRoute:ActivatedRoute,
    private formBuilder:FormBuilder,
    public dialogRef:MatDialogRef<CadastroTurmaComponent>,
    private disciplinaService:DisciplinaService,
    private matSnackBar:MatSnackBar,
    private turmaService:TurmasService
  ) {}

  ngOnInit() {
    this.token=localStorage.getItem('token');
    this.carregarCurso();
    this.carregaProfessor();
    this.configurarFormulario();
    this.carregarDisciplina();
  }
  cadastraTurma(){
    this.submitted=true;
    if(this.formularioDados.invalid){
      this.matSnackBar.open("Algum dado do formulário está errado, cadastro não realizado",null,{
        duration:2000,
        verticalPosition:'top',
      });
      return;
    }else{
      this.turmaService.cadastrarTurma(this.formularioDados.value,this.token).subscribe(data=>{
        if(data!=null){
          this.matSnackBar.open(data,null,{
            duration:2000,
            verticalPosition:'top',
          })
        }}
      );
      this.formularioDados.reset();
    }
  }
  carregarCurso(){
    this.activatedRoute.queryParams.subscribe(params=>{
      this.codCurso=params['codCurso'];
    })
  }
  carregarDisciplina(){
    this.disciplinaService.listaDisciplinasByCurso(this.codCurso).subscribe(disciplinas=>{
      for(let disciplina of disciplinas){
        this.disciplinas.push(disciplina);
      }
    })
  }
  carregaProfessor(){
    this.professorService.listaDeProfessores(/*this.codCurso*/this.token).subscribe(professores=>{
      for(let professor of professores ){
        this.professores.push(professor);
      }
    })
  }
  configurarFormulario(){
    this.formularioDados=this.formBuilder.group({
      codProfessor:[null,[Validators.required]],
      codDisciplina:[null,[Validators.required]],
      periodo:[null,[Validators.required,Validators.maxLength(6),Validators.pattern('[0-9]{4}\.[1-2]{1}?$')]]
    })
  }
  closeDialog(){
    this.dialogRef.close();
  }
  get Form(){
    return this.formularioDados.controls;
  }
}
