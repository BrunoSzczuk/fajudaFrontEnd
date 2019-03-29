import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Router } from '@angular/router';

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

  ngOnInit():void {
    this.data.getLocais().subscribe(r => {
      this.locais = r
      console.log(this.locais)
    })
    
    this.data.getTipoAtendimentos().subscribe(p => {
      this.problemas = p
      console.log(this.problemas)
    })
  }
}
