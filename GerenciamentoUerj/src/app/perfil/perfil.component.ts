import { Component,OnInit,ViewChild, ElementRef, ChangeDetectionStrategy,ChangeDetectorRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../interfaces/usuario';
import {MatTableDataSource} from '@angular/material/table';
import { UsuarioService } from '../services/usuario/usuario.service';
import { UsuarioturmaService } from '../services/usuarioturma/usuarioturma.service';
import { usuarioturma } from '../interfaces/usuarioturma';
import { PerfilService } from '../services/pefil/perfil.service';
import {fadeCR} from './animation';
import {FormGroup, FormBuilder ,Validators} from '@angular/forms';
import { CursoService } from '../services/curso/curso.service'
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../services/login/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
  animations:[
    fadeCR
  ]
})
export class PerfilComponent implements OnInit {
  
  userData:Usuario[]=[]
  cursos=[];
  userTurmas:usuarioturma[]=[];
  imageUpload:File;
  flip:boolean=false;
  formularioDados:FormGroup;
  loading=true;
  usuario:any;
  reloading=false;
  codPerfilFoto=null;

  displayedColumns: string[];
  dataSource:MatTableDataSource<usuarioturma>;

  @ViewChild('sectionPerfil',{static:true}) sectionPerfil:ElementRef;
  @ViewChild('dadosUser',{static:true}) dadosUser:ElementRef;
  @ViewChild('alturaCadPerfilTurma',{static:true}) alturaCadPerfilTurma:ElementRef;

  state='NAO_ATIVO';
  token;

  constructor(
    private activeRouter:ActivatedRoute,
    private userService:UsuarioService,
    private usuarioTurmaService:UsuarioturmaService,
    private perfilService:PerfilService,
    private formBuilder:FormBuilder,
    private cursoService:CursoService,
    private matSnack:MatSnackBar,
    private cdRef: ChangeDetectorRef,
    

  ){}
 
  ngOnInit() {
    this.token=localStorage.getItem('token');;
    this.loading=false;
    this.carregarCursos();
    this.carregarTurmasUsuario();
    this.loadScroll();
    this.checkState();
    this.configurarFormulario();
    this.carregarUser();
  
  }
  atualizarTabela(){
    this.userTurmas=[];
    this.carregarTurmasUsuario();
  }
  carregarCursos(){
    this.cursoService.getAllCourses().subscribe(cursos=>{
      cursos.forEach(curso=>{
        this.cursos.push(curso);
      })
    })
  }

  async carregarUser(){

    this.userData=[];
    this.codPerfilFoto=undefined;
    await this.userService.getUser(this.token).subscribe(usuario=>{
      for(let user of usuario){
        this.userData.push(user);
        this.codPerfilFoto=user.codLogin;
        this.setValuesForm(user);
      }    
    })
  }
  async carregarTurmasUsuario(){
    await this.usuarioTurmaService.getTurmasUser(this.token).subscribe(userTurmas=>{
      for(let userTurma of userTurmas){
        this.userTurmas.push(userTurma);
      }
      this.displayedColumns=  ['nome','nomeDisc','media','periodo','ementa',"operacoes"];
      this.dataSource=new MatTableDataSource(this.userTurmas);
    })
  }
  changeFlip(){
    if(this.flip==false){
      this.flip=true;
      this.formularioDados.enable();
    }else{
      this.flip=false;
      this.formularioDados.disable();
    }
  }
  checkState(){
    this.perfilService.currentMessage.subscribe(message=>{
      if(message=="UPDATE_TABELA"){
        this.atualizarTabela();
        this.perfilService.updateTabela("NAO_ATUALIZA_TABELA");
      }
    })
  }
  configurarFormulario(){
    this.formularioDados=this.formBuilder.group({
      //codLogin:[this.codPerfil,Validators.required],
      login:[null,Validators.required],
      senha:[null,Validators.required],
      nome:[null,Validators.required],
      matricula:[null,Validators.required],
      anoDeIngresso:[null,Validators.required],
      nascimento:[null,Validators.required],
      curso:[null,Validators.required],
      foto:[null,Validators.required]
    })
  }
  deleteUsuarioTurma(codTurma){
    this.usuarioTurmaService.deleteUsuarioTurma(codTurma,this.codPerfilFoto,this.token).subscribe();
    this.perfilService.updateCr("UPDATE_CR");
    this.perfilService.updateCalendario("UPDATE_CALENDARIO");
    this.atualizarTabela();
  }
  getFoto(event){
    this.imageUpload=<File>event.target.files[0];
  }
  loadScroll(){
    this.sectionPerfil.nativeElement.addEventListener('scroll',()=>{
      let disTopAppCr=this.alturaCadPerfilTurma.nativeElement.offsetTop;
      let scroll=this.sectionPerfil.nativeElement.scrollTop;
      if(scroll>disTopAppCr){
        this.state="ATIVO"
        this.perfilService.activateEffectCr("ACTIVATE_EFFECT");
      }else{
        this.state="NAO_ATIVO"
      }
    })
  }
  setValuesForm(user){
    this.formularioDados.controls.nome.setValue(user.nome);
    this.formularioDados.controls.login.setValue(user.login1);
    this.formularioDados.controls.matricula.setValue(user.matricula);
    this.formularioDados.controls.curso.setValue(user.codCurso);
    this.formularioDados.controls.anoDeIngresso.setValue(user.anodeentrada);
    this.formularioDados.controls.nascimento.setValue(user.datanascimento);
  }
  updateUsuario(){
    if(this.formularioDados.invalid){
      this.matSnack.open("Algum dado do formulário de atualização de dados está errado",null,
        {
          duration:2000,
          verticalPosition:'top',
        }
      );
      const controls = this.formularioDados.controls;
      for(let control in controls){
        this.formularioDados.get(control).setErrors(null);
      }
    }else{
      this.cdRef.detach();
      const fd:FormData= new FormData();
      //fd.append('codLogin',this.formularioDados.value.codLogin);
      fd.append('login',this.formularioDados.value.login);
      fd.append('senha',this.formularioDados.value.senha);
      fd.append('nome',this.formularioDados.value.nome);
      fd.append('matricula',this.formularioDados.value.matricula);
      fd.append('curso',this.formularioDados.value.curso);
      fd.append('foto',this.imageUpload,this.imageUpload.name); 
      fd.append('action',"UPDATE_USER");

      let dataIngresso= new Date(this.formularioDados.value.anoDeIngresso);
      let actualDate=dataIngresso.getDate();
      let actualMonth=dataIngresso.getMonth()+1;
      let actualYear=dataIngresso.getFullYear();
      let formattedIngresso=actualDate+"/"+actualMonth+"/"+actualYear;
      fd.append("anoDeIngresso",formattedIngresso);

      let dataNascimento=new Date(this.formularioDados.value.nascimento);
      let actualDate1=dataNascimento.getDate();
      let actualMonth1=dataNascimento.getMonth()+1;
      let actualYear1=dataNascimento.getFullYear();
      let formattedNascimento=actualDate1+"/"+actualMonth1+"/"+actualYear1;
      fd.append('nascimento',formattedNascimento);

      this.userService.updateUser(fd,this.token).subscribe();
      //this.cdRef.reattach();
      this.formularioDados.reset();
      this.cdRef.detectChanges(); 
      this.carregarUser();
    }
  }
}
