import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormGroup,FormBuilder,Validators, NgForm} from '@angular/forms';
import {disciplina} from '../../interfaces/disciplina';
import {DisciplinaService} from '../../services/disciplina/disciplina.service'
import {TabelaCadastroMateriaService} from '../../services/tabelaCadastroMateria/tabela-cadastro-materia.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-cadastro-materia',
  templateUrl: './cadastro-materia.component.html',
  styleUrls: ['./cadastro-materia.component.css']
})
export class CadastroMateriaComponent implements OnInit {

  formularioCadDisciplina;
  submitted=false;
  token;
  constructor(
    private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute,
    private disciplinaService:DisciplinaService,
    private tabCadMateria:TabelaCadastroMateriaService,
    private matSnackBar:MatSnackBar
  ) {  }

  ngOnInit() {
    //this.carregarIdCurso();
    this.token=localStorage.getItem('token');
    this.configurarFormulario();
  }

  configurarFormulario(){
    this.formularioCadDisciplina=this.formBuilder.group({
      nomeDisc:[null,Validators.required],
      credito:[null,[Validators.required,Validators.min(0)]],
      ementa:[null,Validators.required],
    })
  }

  /*carregarIdCurso(){
    this.activatedRoute.queryParams.subscribe(params=>{
      this.idCurso=params['codCurso'];
    })
  }*/
  cadastroDisciplina(){
    this.submitted=true;
    //this.Form.codCurso.setValue();
    if(this.formularioCadDisciplina.invalid){
      this.matSnackBar.open("Algum dado do formulário está errado, cadastro não realizado",null,{
        duration:2000,
        verticalPosition:'top',
      });
      return;
    }else{
      this.disciplinaService.cadastroDisciplina(this.formularioCadDisciplina.value,this.token).subscribe();
      this.formularioCadDisciplina.reset();
      this.tabCadMateria.updateTabela("UPDATETABELA");
  
    }
  }
  get Form(){
    return this.formularioCadDisciplina.controls;
  }
}

