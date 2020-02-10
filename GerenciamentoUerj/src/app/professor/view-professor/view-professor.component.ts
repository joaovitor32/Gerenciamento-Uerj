import { Component, OnInit,Inject, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {professor} from '../../interfaces/professor';
import { Router } from '@angular/router';
import { ProfessorService } from 'src/app/services/professor/professor.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TouchSequence } from 'selenium-webdriver';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-view-professor',
  templateUrl: './view-professor.component.html',
  styleUrls: ['./view-professor.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ViewProfessorComponent implements OnInit {

  token;

  constructor(
    public dialogRef: MatDialogRef<ViewProfessorComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public router:Router,
    public professorService:ProfessorService,
    public formBuilder:FormBuilder,
    private ref:ChangeDetectorRef,

  ) { }

  idProfessor=this.data.codProfessor;
  professor=[];
  formularioDados;

  ngOnInit(){
    this.token=localStorage.getItem('token');
    this.carregaProfessor();
    this.configurarFormulario();
  }
  closeDialog(){
    this.dialogRef.close();
  }
  configurarFormulario(){
    this.formularioDados=this.formBuilder.group({
      nome:[null,Validators.required],
      grandeArea:[null,Validators.required],
    })
  }
  async carregaProfessor(){
    await this.professorService.professorById(this.idProfessor,this.token).subscribe(professor=>{
      this.professor.push(professor);
    })
  }
  changeData(){
    let dados:JSON;
    dados=this.formularioDados.value;
    dados['codProfessor']=this.idProfessor;
    dados['action']="CHANGEDATAPROFESSOR";
    this.professorService.updateProfessor(dados,this.token).subscribe();
    this.formularioDados.reset();  
  }
}
