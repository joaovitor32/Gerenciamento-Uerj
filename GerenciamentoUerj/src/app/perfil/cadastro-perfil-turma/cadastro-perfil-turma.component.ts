import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { FormGroup,Validators,FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import {TurmasService} from '../../services/turmas/turmas.service'
import { UsuarioturmaService } from 'src/app/services/usuarioturma/usuarioturma.service';
import { PerfilService } from 'src/app/services/pefil/perfil.service';


@Component({
  selector: 'app-cadastro-perfil-turma',
  templateUrl: './cadastro-perfil-turma.component.html',
  styleUrls: ['./cadastro-perfil-turma.component.css'],
})
export class CadastroPerfilTurmaComponent implements OnInit {

  codLogin:any;
  codCurso:any;
  formularioPerfilTurma:FormGroup;
  turma=[];
  token;

  constructor(
    private activatedRoute:ActivatedRoute,
    private formBuilder:FormBuilder,
    private matSnackBar:MatSnackBar,
    private turmaService:TurmasService,
    private usuarioTurmaService:UsuarioturmaService,
    private perfilService:PerfilService,
  ) { }

  ngOnInit() {
    this.token=localStorage.getItem('token');
    this.carregarCodPerfil();
    this.carregarCodCurso();
    this.carregarTurmas();
    this.configurarFormulario();
  }
  cadastroPerfilTurma(){
    //this.formularioPerfilTurma.controls.codLogin.setValue(this.codLogin);
    if(this.formularioPerfilTurma.invalid){
      this.matSnackBar.open("Algum dado do formulário de cadastro de turma está incorreto",null,{
        duration:2000,
        verticalPosition:"top"
      
      })
      this.formularioPerfilTurma.reset();
    }else{
      this.usuarioTurmaService.cadastrarUsuarioTurma(this.formularioPerfilTurma.value,this.token).subscribe(data=>{
        if(data){
          this.matSnackBar.open("Associação do usuário com a turma já existe",null,{
            duration:2000,
            verticalPosition:"top"
          });
        }
      });
      this.perfilService.updateTabela("UPDATE_TABELA");
      this.perfilService.updateCalendario("UPDATE_CALENDARIO");
      this.perfilService.updateCr("UPDATE_CR");
      this.formularioPerfilTurma.reset();
  
    }
  }
  carregarCodPerfil(){
    this.activatedRoute.queryParams.subscribe(params=>{
      this.codLogin=params['codLogin'];
    })
  }
  carregarCodCurso(){
    this.activatedRoute.queryParams.subscribe(params=>{
      this.codCurso=params['codCurso'];
    })
  }
  carregarTurmas(){

    this.turmaService.getTurmas(/*this.codCurso*/this.token).subscribe(turmas=>{
        for(let turma of turmas){
          this.turma.push(turma);
        }
    });
  }
  configurarFormulario(){
    this.formularioPerfilTurma=this.formBuilder.group({

        media:[null,[Validators.required,Validators.pattern('[0-9]{1}\.[0-9]{1}?$|[1]{1}[0]{1}?$|[0-9]{1}?$'),Validators.minLength(1),Validators.maxLength(3),Validators.max(10),Validators.min(0)]],
        codTurma:[null,Validators.required],
    })
  }
}
