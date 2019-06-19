import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { MatDialog, MatTableDataSource, MatSnackBar, MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { finalize } from 'rxjs/operators';
import { ConfirmdialogComponent } from '../confirmdialog/confirmdialog.component';
import { Observable, of } from 'rxjs';
import { Atendimento } from '../../models/atendimento';

@Component({
  selector: 'app-homeatendimento',
  templateUrl: './homeatendimento.component.html',
  styleUrls: ['./homeatendimento.component.scss']
})

export class HomeAtendimentoComponent implements OnInit {

  private atendimentos: Atendimento[];
  private atendimento: Atendimento = new Atendimento();
  dataSource;
  displayedColumns: String[] = ['cdAtendimento', 'dtAtendimento', 'dtSolucao', 'local', 'itemAtendimentos', 'stAtendimento', 'action'];
  selection = new SelectionModel<Atendimento>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

  }

  getDsAtendimentos(element) {
    let retorno = "";
    let array = element;
    for (let i = 0; i < array.length; i++) {
      retorno += retorno.length > 0 ? ", " + array[i].tipoAtendimento.dsTipoatendimento :
        "" + array[i].tipoAtendimento.dsTipoatendimento;
    }
    return retorno;
  }

  async altAtendimento(element) {
    this.atendimento = element;
    console.log(element)
    if (this.atendimento.stAtendimento == "ABERTO") {
      this.atendimento.stAtendimento = "EM_ATENDIMENTO"
      this.data.updateAtendimento(this.atendimento).subscribe(response => {
        this.openSnackBar("Atendimento sendo realizado", "OK", 4000)
      }, error => {
        this.openSnackBar(error.error.message, "FECHAR", 7000)
      });

    }
    else if (this.atendimento.stAtendimento == "EM_ATENDIMENTO") {
      this.confirmDialog(element);
    }
  }
  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }

  getIcon(element){
    if(element.stAtendimento == 'ABERTO'){
      return 'play_circle_filled'
    } else if (element.stAtendimento == 'EM_ATENDIMENTO'){
      return 'done'
    } else{
      return 'done_all'
    }
  }

  isDisable(element){
    if(element.stAtendimento == 'FECHADO'){
      return true;
    }
    return false;
  }

  private confirmDialog(element) {
    const dialogRef = this.dialog.open(ConfirmdialogComponent, {
      width: '550px',
      data: "Deseja realmente fechar o atendimento?"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fecharAtendimento(element)
      }
    });
  }

  fecharAtendimento(element){
    this.atendimento.stAtendimento = "FECHADO"
      this.data.updateAtendimento(this.atendimento).subscribe(response => {
        this.openSnackBar("Atendimento encerrado", "OK", 2000)
      }, error => {
        this.openSnackBar(error.error.message, "FECHAR", 7000)
      });
  }
}
