import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MateriasComponent implements OnInit {

  loading=true;

  constructor(
  
  ){}

  ngOnInit() {
    this.loading=false;
  }
 
}
