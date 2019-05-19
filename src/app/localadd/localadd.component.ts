import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
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
  error : string
  constructor(private formBuilder: FormBuilder,
    private snackBar : MatSnackBar,

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
/*
  onSubmit() {
    if (this.local.cdLocal > 0) {
      this.dataService.updateLocal(this.local).pipe(finalize(() => {
        this.dialogRef.close();
        //this.openSnackBar("Salvo com sucesso!", "Fechar");
      })).subscribe(error => {
        console.log('entrou no erro');
        this.dialogRef.close();
        this.openSnackBar("Ocorreu um erro!", "Fechar");
      });
    } else {
      this.dataService.postLocal(this.local).pipe(finalize(() => {
        this.dialogRef.close();
        //this.openSnackBar("Salvo com sucesso!", "Fechar");
      })).subscribe(error => {
        this.dialogRef.close();
        this.openSnackBar("Ocorreu um erro!", "Fechar");
      });
    }
  }*/

  onSubmit() {
    if (this.local.cdLocal > 0) {
      this.dataService.updateLocal(this.local).subscribe( result => {
        this.dialogRef.close();
        this.openSnackBar("Salvo com sucesso!", "Fechar", 2000);
      }, error => {
        this.openSnackBar(this.error, "Fechar", 7000);
      });
    } else {
      this.dataService.postLocal(this.local).subscribe( result => {
        this.dialogRef.close();
        this.openSnackBar("Salvo com sucesso!", "Fechar", 2000);
      }, error => {
        this.error = error.error.errors[0].message
        this.openSnackBar(this.error, "Fechar", 7000);
      });
    }
  }

  onCancelar() {
    this.dialogRef.close();
  }

  ngOnInit() {

  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }

}
