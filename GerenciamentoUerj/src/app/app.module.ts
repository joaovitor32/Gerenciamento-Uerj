import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
	MatSidenavModule, 
	MatListModule, 
	MatTableModule, 
	MatPaginatorModule, 
	MatSortModule, 
	MatNativeDateModule ,
	MatFormFieldModule, 
	MatInputModule, 
	MatDatepickerModule,
	MatPaginatorIntl, 
	MatExpansionModule,
	MatButtonModule,
	MatSelectModule,
	MatGridListModule,
	MatProgressBarModule,
	MatTreeModule,
	MatSnackBarModule,
	MatDialogModule,
	MatTabsModule,
	MatMenuModule,
	MatSnackBarConfig,

} from  '@angular/material';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';

import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { SidenavComponent} from './sidenav/sidenav.component';
import { ProfessorComponent } from './professor/professor.component';
import { HttpModule } from '@angular/http'

import { LoginComponent } from './login/login.component';
import { AuthService } from './services/login/auth.service';
import { AuthGuard } from './services/login/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { ViewProfessorComponent } from './professor/view-professor/view-professor.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { MateriasComponent } from './materias/materias.component';
import { ViewMateriaComponent } from './materias/view-materia/view-materia.component';
import { TabelaProfessorComponent } from './professor/tabela-professor/tabela-professor.component';
import { CadastroProfessorComponent } from './professor/cadastro-professor/cadastro-professor.component';
import { TabelaMateriaComponent } from './materias/tabela-materia/tabela-materia.component';
import { AlertDeleteComponent } from './professor/tabela-professor/alert-delete/alert-delete.component';
import { TurmasProfessorComponent } from './professor/turmas-professor/turmas-professor.component';
import { CadastroMateriaComponent } from './materias/cadastro-materia/cadastro-materia.component';
import { AlertDeleteMateriaComponent } from './materias/tabela-materia/alert-delete-materia/alert-delete-materia.component';
import { AlertTurmaDeleteComponent } from './professor/turmas-professor/alert-turma-delete/alert-turma-delete.component';
import { CadastroTurmaComponent } from './professor/turmas-professor/cadastro-turma/cadastro-turma.component';
import { ProvasComponent } from './provas/provas.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CadastroProvasComponent } from './provas/cadastro-provas/cadastro-provas.component';
import { CadastroCursoComponent } from './sidenav/cadastro-curso/cadastro-curso.component';
import { CadastroPerfilTurmaComponent } from './perfil/cadastro-perfil-turma/cadastro-perfil-turma.component'
import { ChartsModule } from 'ng2-charts';
import { NotasQtdComponent } from './perfil/notas-qtd/notas-qtd.component';
import { CrComponent } from './perfil/cr/cr.component';
import { FooterComponent } from './perfil/footer/footer.component';
import { LoadSpinnerComponent } from './load-spinner/load-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    ProfessorComponent,
    LoginComponent,
    PerfilComponent,
    ViewProfessorComponent,
    CadastroComponent,
    MateriasComponent,
    ViewMateriaComponent,
    TabelaProfessorComponent,
    CadastroProfessorComponent,
	TabelaMateriaComponent,
	AlertDeleteComponent,
	TurmasProfessorComponent,
	CadastroMateriaComponent,
	AlertDeleteMateriaComponent,
	AlertTurmaDeleteComponent,
	CadastroTurmaComponent,
	ProvasComponent,
	CadastroProvasComponent,
	CadastroCursoComponent,
	CadastroPerfilTurmaComponent,
	NotasQtdComponent,
	CrComponent,
	FooterComponent,
	LoadSpinnerComponent,

  ],
  entryComponents: [ 
	  AlertDeleteComponent,
	  AlertDeleteMateriaComponent,
	  AlertTurmaDeleteComponent,
	  CadastroTurmaComponent,
	  CadastroProvasComponent,
	  CadastroCursoComponent, 
      CadastroPerfilTurmaComponent
  ],
  imports: [
	FullCalendarModule,
    BrowserModule,
	AppRoutingModule,
	HttpModule,
	FormsModule,
	ReactiveFormsModule,
	HttpClientModule,	
    BrowserAnimationsModule,	
		MatSidenavModule,
		MatListModule,
		MatTableModule,
		MatDatepickerModule,
		MatPaginatorModule,
		MatTreeModule,
		MatSortModule,
		MatButtonModule,
		MatFormFieldModule,
		MatExpansionModule,
		MatInputModule,
		MatButtonModule,
		MatSelectModule,
		MatGridListModule,
		MatProgressBarModule,
		MatSnackBarModule,
		MatDialogModule,
		LayoutModule,
		MatNativeDateModule,
		MatToolbarModule,
		MatMenuModule,
		MatIconModule,  
		MatTabsModule,
		ChartsModule,
		ScrollingModule,
		ScrollDispatchModule,
		RouterModule.forRoot([
		{
			path:'login',
			component:LoginComponent,
		},
		{
			path:'',
			component:LoginComponent,
		},
		{
			path:'sidenav',
			component:SidenavComponent,
			canActivate:[AuthGuard],
			
			children:[
				{
					path:'professor',
					component:ProfessorComponent,
					canActivate:[AuthGuard],

				},
				{
					path:'perfil',
					component:PerfilComponent,
					canActivate:[AuthGuard],

				},		
				{
					path:'viewprofessor',
					component:ViewProfessorComponent,
					canActivate:[AuthGuard],

				},
				{
					path:'cadastro',
					component:CadastroComponent,
					canActivate:[AuthGuard],

				},
				{
					path:'materias',
					component:MateriasComponent,
					canActivate:[AuthGuard],

				},
				{
					path:"viewMateria",
					component:ViewMateriaComponent,
					canActivate:[AuthGuard],
				},
				{
					path:"provas",
					component:ProvasComponent,
					canActivate:[AuthGuard],
				},
			]
		},
		])
  ],
  providers: [
	AuthGuard,
	AuthService,  
	MatNativeDateModule,
	TabelaProfessorComponent,
	SidenavComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
