import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  tipoatendimento: Object;
  locais: Object;
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.data.getTipoAtendimentos().subscribe(content => {
      this.tipoatendimento = content
      console.log(this.tipoatendimento)
    })

    this.data.getLocais().subscribe(content => {
      this.locais = content
      console.log(this.locais)
    })

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}
