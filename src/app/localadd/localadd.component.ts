import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Local } from 'src/models/local';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-localadd',
  templateUrl: './localadd.component.html',
  styleUrls: ['./localadd.component.scss']
})
export class LocaladdComponent implements OnInit {
  messageForm: FormGroup;
  local: Local
  title : string;
  constructor(private formBuilder: FormBuilder,

    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public dados: any,
    public dialogRef: MatDialogRef<LocaladdComponent>) {
    if (dados != "") {
      this.local = dados;
      this.title = "Editar Local " + this.local.cdLocal;
    } else{
      this.local = new Local();
      this.title = "Novo Local"
    }  
  }

  onSubmit() {
    if (this.local.cdLocal > 0) {
      this.dataService.updateLocal(this.local).pipe(finalize(() => {
        this.dialogRef.close();
      })).subscribe(error => {
        this.dialogRef.close();
      });
    } else {
      this.dataService.postLocal(this.local).pipe(finalize(() => {
        this.dialogRef.close();
      })).subscribe(error => {
        this.dialogRef.close();
      });
    }
  }

  onCancelar() {
    this.dialogRef.close();
  }

  ngOnInit() {

  }

}
