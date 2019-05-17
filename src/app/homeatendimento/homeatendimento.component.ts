import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { MatDialog, MatTableDataSource } from '@angular/material';
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
  dataSource;
  displayedColumns: String[] = ['cdAtendimento', 'dtAtendimento', 'dtSolucao', 'local'/*, 'itemAtendimentos[1]', 'stAtendimento'*/, 'action'];
  selection = new SelectionModel<Atendimento>(true, []);
  constructor(private data: DataService,
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute) {

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
}
