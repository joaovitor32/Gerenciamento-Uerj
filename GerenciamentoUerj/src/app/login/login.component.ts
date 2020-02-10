import { Component, OnInit, EventEmitter, ViewEncapsulation } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { AuthService } from '../services/login/auth.service';
import { MatDialog, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { CadastroComponent } from '../cadastro/cadastro.component';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  //encapsulation:ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  

  constructor(
      private Auth:AuthService,
      private router:Router,
      private formBuilder:FormBuilder,
      private matDialog:MatDialog,
      private snackBar:MatSnackBar
  ) { }
  formularioDados:FormGroup

  ngOnInit() {
    this.configurarFormulario();
  }
  configurarFormulario(){
    this.formularioDados=this.formBuilder.group({
      login:[null,Validators.required],
      senha:[null,Validators.required]
    })
  }
  async fazerLogin(){
    let formJson;
    formJson=this.formularioDados.value;
    formJson['action']="VERIFICA_LOGIN";
  
    await this.Auth.fazerLogin(formJson).subscribe(data=>{
            localStorage.setItem('token',data);
            this.Auth.setLoggedIn(true);
            this.router.navigate(['sidenav/perfil'],
          )},(err:HttpErrorResponse)=>{
    
            let config=new MatSnackBarConfig();
            config.duration=2000;
            config.panelClass='snack-message';
            this.snackBar.open("Usuário não foi encontrado no banco de dados",null,config);
            this.Auth.setLoggedIn(false); 
          }
      )
      this.formularioDados.reset();
  }
  openCadDialog(){
    let diaolog=this.matDialog.open(CadastroComponent,{
        width:"600px",
    })
  }
}
