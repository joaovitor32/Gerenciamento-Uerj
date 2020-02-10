import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from  '@angular/material/dialog';
import { DisciplinaService } from 'src/app/services/disciplina/disciplina.service';

@Component({
  selector: 'app-alert-delete-materia',
  templateUrl: './alert-delete-materia.component.html',
  styleUrls: ['./alert-delete-materia.component.css']
})
export class AlertDeleteMateriaComponent implements OnInit {

  info;
  codDisciplina;
  token;
  constructor(
    @Inject (MAT_DIALOG_DATA) public data,
    private dialogRef:MatDialogRef<AlertDeleteMateriaComponent>,
    private disciplinaService:DisciplinaService

  ) {
    this.info=this.data.data;
    this.codDisciplina=this.data.codDisciplina;
  }

  ngOnInit() {
    this.token=localStorage.getItem('token');
  }
  closeDialog(){
    this.dialogRef.close();
  }
  async deletaDisciplina(codDisciplina){
    await this.disciplinaService.eraseDisciplina(this.codDisciplina,this.token).subscribe();
    this.closeDialog();
  }
}
