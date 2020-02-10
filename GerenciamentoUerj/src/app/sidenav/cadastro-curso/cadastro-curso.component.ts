import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { CursoService} from '../../services/curso/curso.service';
import { MatSnackBar, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-cadastro-curso',
  templateUrl: './cadastro-curso.component.html',
  styleUrls: ['./cadastro-curso.component.css']
})
export class CadastroCursoComponent implements OnInit {

  submited=false;
  formularioCurso:FormGroup
  token;
  constructor(
    private formBuilder:FormBuilder,
    private cursoService:CursoService,
    private matSnackBar:MatSnackBar,
    private matDialogRef:MatDialogRef<CadastroCursoComponent>
  ) { }

  ngOnInit() {
    this.configurarFormulario();
    this.token=localStorage.getItem('token');;
  }
  cadastrarCurso(){
    this.submited=true;
    if(this.formularioCurso.invalid){
      this.matSnackBar.open("Algum dado do formulário está incorreto",null,{
        duration:2000,
        verticalPosition:"top",
      })
    }else{
      this.cursoService.cadastrarCurso(this.formularioCurso.value,this.token).subscribe();
      this.formularioCurso.reset();
    }
  }
  configurarFormulario(){
    this.formularioCurso=this.formBuilder.group({
      nomeCurso:[null,Validators.required],
    })
  }
  closeDialog(){
    this.matDialogRef.close();
  }
}
