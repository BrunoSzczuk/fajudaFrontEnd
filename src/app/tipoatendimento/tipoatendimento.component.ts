import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { TipoatendimentoaddComponent } from '../tipoatendimentoadd/tipoatendimentoadd.component';
import { TipoAtendimento } from 'src/models/tipoatendimento';
import { Response } from 'src/models/response';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-tipoatendimento',
  templateUrl: './tipoatendimento.component.html',
  styleUrls: ['./tipoatendimento.component.scss']
})

export class TipoAtendimentoComponent implements OnInit {

  private tipoatendimento: TipoAtendimento[];
  dataSource;
  displayedColumns: String[] = ['cdTipoAtendimento', 'dsTipoAtendimento', 'action'];
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
    this.data.getLocais().subscribe(response => {
      this.locais = response.content
      this.dataSource = new MatTableDataSource(this.locais);
      console.log("datatable: " + this.dataSource)
    })

  }

  private openDialog(local : Local): void {
    console.log(local)
    const dialogRef = this.dialog.open(LocaladdComponent, {
      width: '550px',
      data : local
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['../local'], { relativeTo: this.route });
      this.ngOnInit();
    });
  }
  
  deleteLocal(id){
    this.data.deleteLocal(id);
  }
}
