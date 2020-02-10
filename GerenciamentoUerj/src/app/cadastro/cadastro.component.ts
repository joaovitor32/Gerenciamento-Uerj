import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar,MatSnackBarConfig } from '@angular/material';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { group } from '@angular/animations';
import { CursoService } from '../services/curso/curso.service';
import { UsuarioService } from '../services/usuario/usuario.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  submitted=false;
  srcImage;

  constructor(
    private dialogRef:MatDialogRef<CadastroComponent>,
    private formBuilder:FormBuilder,
    private cursosService:CursoService,
    private usuarioService:UsuarioService,
    private matSnackBar:MatSnackBar
  ) { }

  cursos=[];
  formularioDados:FormGroup;
  imageUpload:File;

  ngOnInit() {
    this.configurarFormulario();
    this.carregarCurso();

  }
  async carregarCurso(){
    await this.cursosService.getAllCourses().subscribe(cursos=>{
      for(let curso of cursos){
        this.cursos.push(curso); 
      }
    })
  }
  closeDialog(){
    this.dialogRef.close();
  }
  configurarFormulario(){
    this.formularioDados=this.formBuilder.group({
      login1:[null,Validators.required],
      nome:[null,Validators.required],
      senha:[null,Validators.required],
      matricula:[null,Validators.required],
      dataNascimento:[null,Validators.required],
      anoEntrada:[null,Validators.required],
      foto:[null,Validators.required],
      codCurso:[null,Validators.required]
    })
  }
  getFoto(event){
    this.imageUpload=<File>event.target.files[0];
  
    let fileReader= new FileReader();
    fileReader.onload=()=>{
      this.srcImage=fileReader.result;
    }
    fileReader.readAsDataURL(event.target.files[0]);
  }
  async cadastroUsuario(){
    this.submitted=true;
    if(this.formularioDados.invalid){
      this.matSnackBar.open("Algum dado do formulário está errado, cadastro não realizado",null,{
        duration:2000,
        verticalPosition:'top',
      });
    }else{
      const fd:FormData=new FormData();
      fd.append('nome',this.formularioDados.value.nome);
      fd.append('action',"cadastroUser");
      fd.append('login1',this.formularioDados.value.login1);
      fd.append('senha',this.formularioDados.value.senha);
      fd.append('matricula',this.formularioDados.value.matricula);
      
      let d=new Date(this.formularioDados.value.dataNascimento);
      let actualDate=d.getDate();
      let actualMonth=d.getMonth()+1;
      let actualYear=d.getFullYear();    
      let formattedDate=actualDate + '/' + actualMonth + '/' + actualYear;
      fd.append('datanascimento',formattedDate);
  
      fd.append('codCurso',this.formularioDados.value.codCurso);
  
      let d1=new Date(this.formularioDados.value.anoEntrada);
      let actualDate1=d1.getDate();
      let actualMonth1=d1.getMonth()+1;
      let actualYear1=d1.getFullYear();    
      let formattedDate1=actualDate1 + '/' + actualMonth1 + '/' + actualYear1;
      fd.append('anoEntrada',formattedDate1);
      
      fd.append('fotoPerfil',this.imageUpload,this.imageUpload.name);
      
      this.srcImage=null;
      
      await this.usuarioService.cadastroUser(fd).subscribe(data=>{
          if(data!=null){
            let config=new MatSnackBarConfig();
            config.duration=2000;
            config.panelClass='snack-message';
            this.matSnackBar.open(JSON.stringify(data),null,config);
          }
        }
      );
    }
    this.formularioDados.reset();
  }
  get Form(){
    return this.formularioDados.controls;
  }
}
