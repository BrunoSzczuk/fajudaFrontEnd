import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirmdialog',
  templateUrl: './confirmdialog.component.html',
  styleUrls: ['./confirmdialog.component.scss']
})
export class ConfirmdialogComponent implements OnInit {
  titleDialog : string = "teste title";
  messageDialog : string = "teste message";


  constructor(
    public dialogRef: MatDialogRef<ConfirmdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string) {}

  onNoClick(): void {
      this.dialogRef.close();
  }

  ngOnInit() {
  }

}
