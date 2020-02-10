import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import { ProfessorService } from 'src/app/services/professor/professor.service';
import { AlertTurmaDeleteComponent } from '../../turmas-professor/alert-turma-delete/alert-turma-delete.component';


@Component({
  selector: 'app-alert-delete',
  templateUrl: './alert-delete.component.html',
  styleUrls: ['./alert-delete.component.css']
})
export class AlertDeleteComponent implements OnInit {
  
  info;
  token;

  constructor(
    @Inject (MAT_DIALOG_DATA) public data,
    private professorService:ProfessorService,
    public dialogRef:MatDialogRef<AlertDeleteComponent>,
  ) { }

  ngOnInit() {
    this.info=this.data.data;
    this.token=localStorage.getItem('token');
  }
  
  async eraseProfessor(){
    await this.professorService.eraseProfessor(this.data.codProfessor,this.token).subscribe();
    this.closeDialog();
  }
  closeDialog(){
    this.dialogRef.close();
  }
}
