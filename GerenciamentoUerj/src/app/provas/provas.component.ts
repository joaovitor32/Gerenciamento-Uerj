import { Component, OnInit ,ViewChild, ViewEncapsulation} from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid'; 
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { MatDialog } from '@angular/material';
import { CadastroProvasComponent } from './cadastro-provas/cadastro-provas.component';
import { ActivatedRoute } from '@angular/router';
import { ProvasService } from '../services/provas/provas.service';
import { empty } from 'rxjs';


@Component({
  selector: 'app-provas',
  templateUrl: './provas.component.html',
  styleUrls: ['./provas.component.css','./provas.component.scss'],
})
export class ProvasComponent implements OnInit {

  @ViewChild('calendar',{static:true}) calendarComponent:FullCalendarComponent;
  calendarPlugins;
 
  loading=true;

  codCurso:any;
  provas:any;
  idUser:any;

  token;

  constructor(
    private matDialog:MatDialog,
    private activatedRoute:ActivatedRoute,
    private provasService:ProvasService
  ) { }

  ngOnInit() {
    this.token=localStorage.getItem('token');
    this.calendarPlugins=  [dayGridPlugin,timeGridPlugin ,listPlugin, interactionPlugin];
    this.carregarIdUser();
    this.carregarCodCurso();
    this.reloadFullCalendar();
    this.loading=false;
  }
  addEvent(dado){
    let data=dado.target.dataset.date;
    if(data!=null||data!=undefined){
      let dialog=this.matDialog.open(CadastroProvasComponent,{
        width:"600px",
        data,
      });
      dialog.afterClosed().subscribe(()=>{
        this.reloadFullCalendar();
      })
    } 
  }
  carregarCodCurso(){
    this.activatedRoute.queryParams.subscribe(params=>{
      this.codCurso=params['codCurso'];
    })
  }
  carregarIdUser(){
    this.activatedRoute.queryParams.subscribe(params=>{
      this.idUser=params['codLogin'];
    })
  }
  reloadFullCalendar(){
    this.provasService.getProvas(this.token).subscribe(provas=>{
      empty(this.provas);
      this.provas=provas;
    });
  }
}


