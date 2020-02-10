import { Component ,OnInit, ViewChild , ViewEncapsulation} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {ActivatedRoute,Router} from '@angular/router';
import {Usuario} from '../interfaces/usuario';
import { FormBuilder ,Validators,FormGroup} from '@angular/forms';
import { MatDialog,MatSidenavContainer} from '@angular/material';
import { CadastroCursoComponent } from './cadastro-curso/cadastro-curso.component';
import {CdkScrollable} from '@angular/cdk/scrolling';
import { AuthService } from '../services/login/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SidenavComponent implements OnInit {

  newLogin:Usuario[]=[];
  activeView:string="sidenav"
  opened:boolean=true;
  formularioCurso:FormGroup;
  scrollingSubscription;
  lastOffset=0; 

  constructor(
      private route:ActivatedRoute,
      private router:Router,
      private formBuilder:FormBuilder,
      private matDialog:MatDialog,
      private authService:AuthService
      
  ){}
  ngOnInit(){

    this.configurarFormulario();
  }
  toggle(){
    this.opened=!this.opened;
  }
 
  configurarFormulario(){
    this.formularioCurso=this.formBuilder.group({
      nome:[null,Validators.required]
    })
  }
  cadastrarCurso(){
    let dialog=this.matDialog.open(CadastroCursoComponent,{
      width:"400px",
      height:"210px"
    })
  }
  logout(){
    this.authService.setLoggedIn(false);
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}  




