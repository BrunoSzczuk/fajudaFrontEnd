import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../data.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Local } from '../../models/local';
import { TipoAtendimento } from '../../models/tipoatendimento';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  selecionados : TipoAtendimento[];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  problemasFiltrados: Observable<TipoAtendimento[]>;


  locais: Local[];
  problemas: TipoAtendimento[];
  fControlLocais = new FormControl();
  fControlProblemas = new FormControl();
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;

  constructor(private data: DataService, private router: Router) {
    this.problemasFiltrados = this.fControlProblemas.valueChanges.pipe(
      startWith(null),
      map((problema: string | null) => problema ? this._filter(problema) : this.problemas.slice()));

  }
  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        // this.problemas.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.fControlProblemas.setValue(null);
    }
  }

  remove(fruit: TipoAtendimento): void {
    console.log("entrou no remove")
    const index = this.problemas.indexOf(fruit);

    if (index >= 0) {
      this.problemas.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    console.log("entrou no selected")
    let tipo = new TipoAtendimento();
    tipo.dsTipoatendimento = event.option.viewValue;
    //this.problemas.push(tipo);
    this.fruitInput.nativeElement.value = '';
    this.fControlProblemas.setValue(null);
  }

  private _filter(value: string): TipoAtendimento[] {
    const filterValue = value.toLowerCase();

    return this.problemas.filter(fruit => fruit.dsTipoatendimento.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit(): void {
    this.data.getLocais().subscribe(response => {
      this.locais = response.content;
    })

    this.data.getTipoAtendimentos().subscribe(p => {
      this.problemas = p.content
    })
  }

  private clickSaveAtendimento(local: Local, tipoAtendimentos: TipoAtendimento[]): void {

  }
}
