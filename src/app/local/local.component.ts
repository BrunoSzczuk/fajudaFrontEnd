import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { MatDialog, MatTableDataSource } from '@angular/material';
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
  displayedColumns: String[] = ['cdLocal', 'dsLocal', 'obsLocal', 'action'];
  selection = new SelectionModel<Local>(true, []);
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
  checkboxLabel(row?: Local): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.cdLocal + 1}`;
  }
  ngOnInit() {
    this.data.getLocais().subscribe(response => {
      this.locais = response.content
      this.dataSource = new MatTableDataSource(this.locais);
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
      this.data.deleteLocal(id).pipe(finalize(() => {
        this.ngOnInit();
      })).subscribe(error => {
        this.ngOnInit();
      });
  }

  private confirmDialog(id) {
    const dialogRef = this.dialog.open(ConfirmdialogComponent, {
      width: '550px',
      data: "Do you confirm the deletion of this data?"
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.deleteLocal(id);
      }
    });
  }
}
