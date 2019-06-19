import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { MatDialog, MatTableDataSource, MatSnackBar, MatPaginator, MatSort } from '@angular/material';
import { LocaladdComponent } from '../localadd/localadd.component';
import { Local } from 'src/models/local';
import { Response } from 'src/models/response';
import { SelectionModel } from '@angular/cdk/collections';
import { finalize } from 'rxjs/operators';
import { ConfirmdialogComponent } from '../confirmdialog/confirmdialog.component';

@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.scss']
})

export class LocalComponent implements OnInit {

  private locais: Local[];
  dataSource;
  error: string;
  displayedColumns: String[] = ['cdLocal', 'dsLocal', 'obsLocal', 'action'];
  selection = new SelectionModel<Local>(true, []);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  constructor(private data: DataService,
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.data.getLocais().subscribe(response => {
      this.locais = response.content
      this.dataSource = new MatTableDataSource(this.locais);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
  checkboxLabel(row?: Local): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.cdLocal + 1}`;
  }
  
  private openDialog(local: Local): void {
    console.log(local)
    const dialogRef = this.dialog.open(LocaladdComponent, {
      width: '550px',
      data: local
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['../local'], { relativeTo: this.route });
      this.ngOnInit();
    });
  }

  deleteLocal(id) {
    this.data.deleteLocal(id).subscribe(result => {
      this.ngOnInit()
      this.openSnackBar("Excluído com sucesso!", "Fechar", 2000)
    }, error => {
      this.ngOnInit();
      this.error = error.error.message
      this.openSnackBar(this.error, "Fechar", 7000)
    });
  }

  private confirmDialog(id) {
    const dialogRef = this.dialog.open(ConfirmdialogComponent, {
      width: '550px',
      data: "Deseja realmente excluir o local?"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteLocal(id);
      }
    });
  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }
}
