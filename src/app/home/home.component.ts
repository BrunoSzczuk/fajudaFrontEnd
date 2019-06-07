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
import { Atendimento } from 'src/models/atendimento';
import { ItemAtendimento } from 'src/models/itemAtendimento';
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
  selecionados: TipoAtendimento[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  problemasFiltrados: Observable<TipoAtendimento[]>;

  local: Local;
  locais: Local[];
  problemas: TipoAtendimento[];
  fControlLocais = new FormControl();
  fControlProblemas = new FormControl();
  @ViewChild('auto2') matAutocomplete: MatAutocomplete;
  @ViewChild('auto') matAutocompleteLocal: MatAutocomplete;
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

  remove(tipo: TipoAtendimento): void {
    const index = this.selecionados.indexOf(tipo);
    if (index >= 0) {
      this.selecionados.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (this.find(event.option.viewValue, this.selecionados) != null) {
      return;
    }
    let tipo = this.find(event.option.viewValue, this.problemas);
    this.selecionados.push(tipo);
    this.fruitInput.nativeElement.value = '';
    this.fControlProblemas.setValue(null);
  }

  private _filter(value: string): TipoAtendimento[] {
    const filterValue = value.toLowerCase();

    return this.problemas.filter(fruit => fruit.dsTipoatendimento.toLowerCase().indexOf(filterValue) === 0);
  }

  find(descricao: string, lista: TipoAtendimento[]): TipoAtendimento {
    if (lista.length > 0) {
      return lista.find(obj => obj.dsTipoatendimento == descricao);
    }
    return null;
  }

  ngOnInit(): void {
    this.data.getLocais().subscribe(response => {
      this.locais = response.content;
    })

    this.data.getTipoAtendimentos().subscribe(p => {
      this.problemas = p.content
    })
  }

  private clickSaveAtendimento(): void {
    console.log("local: " + JSON.stringify(this.local))
    console.log("tipos de atendimento " + JSON.stringify(this.selecionados))
    let atendimento = new Atendimento();
    atendimento.dtAtendimento = new Date();
    atendimento.local = this.local;
    atendimento.stAtendimento = "ABERTO";

    atendimento.itematendimentos = [];
    for (let i = 0; i < this.selecionados.length; i++) {
      const element = this.selecionados[i];
      let item = new ItemAtendimento();
      item.tipoAtendimento = element;
      atendimento.itematendimentos.push(item)
    }
    this.data.postAtendimento(atendimento);
  }
}
