import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  tipoatendimento: Object;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getTipoAtendimentos().subscribe(content => {
      this.tipoatendimento = content
      console.log(this.tipoatendimento)
    })
  }

}
