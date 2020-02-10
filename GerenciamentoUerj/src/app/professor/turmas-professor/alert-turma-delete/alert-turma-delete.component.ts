import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA,MatDialogRef} from  '@angular/material/dialog';
import { TurmasService } from 'src/app/services/turmas/turmas.service';


@Component({
  selector: 'app-alert-turma-delete',
  templateUrl: './alert-turma-delete.component.html',
  styleUrls: ['./alert-turma-delete.component.css']
})
export class AlertTurmaDeleteComponent implements OnInit {

  info;
  token;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef:MatDialogRef<AlertTurmaDeleteComponent>,
    private turmaService:TurmasService  
  ) { }

  ngOnInit() {
    this.info=this.data.data
    this.token=localStorage.getItem('token');
  }
  async eraseProfessor(){
    await this.turmaService.eraseTurma(this.data.codProfessor,this.token).subscribe();
    this.closeDialog();
  }
  closeDialog(){
    this.dialogRef.close();
  }
}
