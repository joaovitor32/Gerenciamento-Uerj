import { Component, OnInit ,ViewEncapsulation} from '@angular/core';

 
@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ProfessorComponent implements OnInit {
  
  loading=true;

  constructor(
  ) { }

  ngOnInit() { 
    this.loading=false;  
  }
}
