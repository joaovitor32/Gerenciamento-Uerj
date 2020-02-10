import { Component, OnInit,EventEmitter,Input,HostListener,Output} from '@angular/core';
import {TabelaProfessorComponent} from '../tabela-professor/tabela-professor.component';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {ProfessorService} from '../../services/professor/professor.service'
import {ActivatedRoute} from '@angular/router';
import { SidenavComponent } from 'src/app/sidenav/sidenav.component';
import { ProfessorComponent } from '../professor.component';
import {TabelaCadastroProfessorService} from '../../services/tabelaCadastroProfessor/tabela-cadastro-professor.service'
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-cadastro-professor',
  templateUrl: './cadastro-professor.component.html',
  styleUrls: ['./cadastro-professor.component.css']
})
export class CadastroProfessorComponent implements OnInit {

  idCurso:any;
  formularioCadProfessor:FormGroup;
  submitted=false;
  token;

  constructor(
    private formBuilder:FormBuilder,
    private professorService:ProfessorService,
    private activeRoute:ActivatedRoute,
    private tabCadProfessor:TabelaCadastroProfessorService,
    private matSnackBar:MatSnackBar
  ) { }


  ngOnInit(){ 
    this.token=localStorage.getItem('token');
    this.carregarIdCurso();
    this.configurarFormulario();
  }
  carregarIdCurso(){
    this.activeRoute.queryParams.subscribe(params=>{
      this.idCurso=params['codCurso'];
    })
  }
  configurarFormulario(){
    this.formularioCadProfessor=this.formBuilder.group({
      nome:[null,Validators.required],
      grandeArea:[null,Validators.required],
      
    })
  }
  
  cadastrarProfessor(){
    this.submitted=true;
    //this.formularioCadProfessor.controls.codCurso.setValue(this.idCurso);
    if(this.formularioCadProfessor.invalid){
      this.matSnackBar.open("Algum dado do formulário está errado, cadastro não realizado",null,{
        duration:2000,
        verticalPosition:'top',
      });
      return;
    }
    this.professorService.cadastroProfessor(this.formularioCadProfessor.value,this.token).subscribe();
    this.tabCadProfessor.updateTabela("UPDATETABELA");
    this.formularioCadProfessor.reset();
    this.formularioCadProfessor.markAsPristine();
    this.formularioCadProfessor.markAsUntouched();
    this.formularioCadProfessor.updateValueAndValidity();
    this.submitted=false;
  }
  get Form(){
    return this.formularioCadProfessor.controls;
  }
}
