import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { MatDialog, MatTableDataSource, MatSnackBar } from '@angular/material';
import { Atendimento } from 'src/models/atendimento';
import { SelectionModel } from '@angular/cdk/collections';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-homeatendimento',
  templateUrl: './homeatendimento.component.html',
  styleUrls: ['./homeatendimento.component.scss']
})

export class HomeAtendimentoComponent implements OnInit {

  private atendimentos: Atendimento[];
  private atendimento : Atendimento = new Atendimento();
  dataSource;
  displayedColumns: String[] = ['cdAtendimento', 'dtAtendimento', 'dtSolucao', 'local', 'itemAtendimentos', 'stAtendimento', 'action'];
  selection = new SelectionModel<Atendimento>(true, []);
  constructor(private data: DataService,
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {

  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Atendimento): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.cdAtendimento + 1}`;
  }
  ngOnInit() {
    this.data.getAtendimentos().subscribe(response => {
      this.atendimentos = response.content
      this.dataSource = new MatTableDataSource(this.atendimentos);
    })

  }

  getDsAtendimentos(element){
    let retorno = "";
    let array = element;
    console.log(array)
    for (let i = 0; i < array.length; i++) {
      retorno += (retorno.length > 0 ? ", " : "") + array[i].tipoAtendimento.dsTipoatendimento;
    }
    return retorno;
  }

  altAtendimento(element){
    this.atendimento = element;
    if (this.atendimento.stAtendimento == "ABERTO") {
        this.atendimento.stAtendimento = "EM_ATENDIMENTO"
        this.data.updateAtendimento(this.atendimento).subscribe(response =>{
          if(response){
            this.openSnackBar("Atendimento sendo realizado", "OK", 2000)
          }
        }, error => {
          this.openSnackBar(error, "FECHAR", 7000)
        });
    } 
    else if (this.atendimento.stAtendimento == "EM_ATENDIMENTO"){
      this.atendimento.stAtendimento = "FECHADO"
        this.data.updateAtendimento(this.atendimento).subscribe(response =>{
          if(response){
            this.openSnackBar("Atendimento encerrado", "OK", 2000)
          }
        }, error => {
          this.openSnackBar(error, "FECHAR", 7000)
        });
    }
  }
  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }
}
