import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Local } from '../../models/local';
import { TipoAtendimento } from '../../models/tipoatendimento';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  locais = new Object();
  problemas = new Object();
  fControlLocais = new FormControl();
  fControlProblemas = new FormControl();

  constructor(private data: DataService, private router: Router) { }

  ngOnInit(): void {
    this.data.getLocais().subscribe(r => {
      this.locais = r
    })

    this.data.getTipoAtendimentos().subscribe(p => {
      this.problemas = p
    })
  }

  private clickSaveAtendimento(local : Local, tipoAtendimentos : TipoAtendimento[]): void {
    
  }
}
