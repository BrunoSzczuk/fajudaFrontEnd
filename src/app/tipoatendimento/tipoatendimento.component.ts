import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { TipoAtendimentoaddComponent } from '../tipoatendimentoadd/tipoatendimentoadd.component';
import { TipoAtendimento } from 'src/models/tipoatendimento';
import { Response } from 'src/models/response';
import { SelectionModel } from '@angular/cdk/collections';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-tipoatendimento',
  templateUrl: './tipoatendimento.component.html',
  styleUrls: ['./tipoatendimento.component.scss']
})

export class TipoAtendimentoComponent implements OnInit {

  private tipoatendimento: TipoAtendimento[];
  dataSource;
  displayedColumns: String[] = ['cdTipoatendimento', 'dsTipoatendimento', 'action'];
  selection = new SelectionModel<TipoAtendimento>(true, []);
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
  checkboxLabel(row?: TipoAtendimento): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.cdTipoatendimento + 1}`;
  }
  ngOnInit() {
   this.data.getTipoAtendimentos().subscribe(response => {
      this.tipoatendimento = response.content
      this.dataSource = new MatTableDataSource(this.tipoatendimento);
      console.log("datatable: " + this.dataSource)
    })

  }

  private openDialog(tipoatendimento : TipoAtendimento): void {
    console.log(tipoatendimento)
    const dialogRef = this.dialog.open(TipoAtendimentoaddComponent, {
      width: '550px',
      data : tipoatendimento
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['../tipoatendimento'], { relativeTo: this.route });
      this.ngOnInit();
    });
  }
  
  deleteTipoAtendimento(id){
    this.data.deleteTipoAtendimento(id).pipe(finalize(() => {
      this.ngOnInit();
    })).subscribe(error => {
      this.ngOnInit();
    });
  }
}
