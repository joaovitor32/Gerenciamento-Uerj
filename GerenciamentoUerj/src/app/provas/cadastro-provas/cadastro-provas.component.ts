import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {TurmasService} from '../../services/turmas/turmas.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { ProvasService } from 'src/app/services/provas/provas.service';

@Component({
  selector: 'app-cadastro-provas',
  templateUrl: './cadastro-provas.component.html',
  styleUrls: ['./cadastro-provas.component.css']
})
export class CadastroProvasComponent implements OnInit {

  deleteEvent:FormGroup;
  formularioCadastroProva:FormGroup;
  turmas=[];
  codCurso;
  submited=false;

  token;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef:MatDialogRef<CadastroProvasComponent>,
    private formBuilder:FormBuilder,
    private turmaService:TurmasService,
    private activatedRoute:ActivatedRoute,
    private matSnackBar:MatSnackBar,
    private provasService:ProvasService
  ) { }

  ngOnInit() {
    this.token=localStorage.getItem('token');
    //this.carregarCodCurso();
    this.carregarTurma();
    this.configurarFormularioDelete();
    this.configurarFormularioCadastroProva();

  }
  carregarCodCurso(){
    this.activatedRoute.queryParams.subscribe(params=>{
      this.codCurso=params['codCurso'];
    })
  }
  cadastrarProva(){
    this.submited=true;
    if(this.formularioCadastroProva.invalid==true){
      this.matSnackBar.open("Algum dado do formulário está incorreto",null,{
        duration:2000,
        verticalPosition:"top",
      });
      return;
    }else{
      this.provasService.cadastrarProva(this.formularioCadastroProva.value,this.token).subscribe();
      this.formularioCadastroProva.reset();
  
    }  
  }
  carregarTurma(){
    this.turmaService.getTurmas(/*this.codCurso*/this.token).subscribe(turmas=>{
      for(let turma of turmas){
        this.turmas.push(turma);
      }
    })
  }
  configurarFormularioDelete(){
    this.deleteEvent=this.formBuilder.group({
      start:[this.data,Validators.required],
    })
  }
  configurarFormularioCadastroProva(){
    this.formularioCadastroProva=this.formBuilder.group({
      start:[this.data,Validators.required],
      title:[null,Validators.required],
      codTurma:[null,Validators.required],
    })
  }
  closeDialog(){
    this.dialogRef.close();
  }
  deleteProvas(){
    this.provasService.deleteProvas(this.deleteEvent.value,this.token).subscribe();
    this.deleteEvent.reset();
  }
}
