import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tipoatendimento',
  templateUrl: './tipoatendimento.component.html',
  styleUrls: ['./tipoatendimento.component.scss']
})
export class TipoatendimentoComponent implements OnInit {

 
  tipoatendimento = new Object();

  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {
    this.data.getTipoAtendimentos().subscribe(content => {
      this.tipoatendimento = content
    })
  }

  private goToAddPage() {
    this.router.navigate(['/tipoatendimento/add']); 
}
}
