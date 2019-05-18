import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { TipoAtendimento } from 'src/models/tipoatendimento';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-tipoatendimentoadd',
  templateUrl: './tipoatendimentoadd.component.html',
  styleUrls: ['./tipoatendimentoadd.component.scss']
})
export class TipoAtendimentoaddComponent implements OnInit {
  messageForm: FormGroup;
  tipoatendimento: TipoAtendimento
  title : string;
  constructor(private formBuilder: FormBuilder,
    private snackBar : MatSnackBar,

    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public dados: any,
    public dialogRef: MatDialogRef<TipoAtendimentoaddComponent>) {
    if (dados != ""){
      this.tipoatendimento = dados;
      this.title = "Editar Tipo de Atendimento " + this.tipoatendimento.cdTipoatendimento;
    } else {
      this.tipoatendimento = new TipoAtendimento();
      this.title = "Novo Tipo de Atendimento"
    }  
  }

  onSubmit() {
    if (this.tipoatendimento.cdTipoatendimento > 0) {
      this.dataService.updateAtendimento(this.tipoatendimento).pipe(finalize(() => {
        this.dialogRef.close();
        this.openSnackBar("Salvo com sucesso!", "Fechar");
      })).subscribe(error => {
        this.dialogRef.close();
        this.openSnackBar("Ocorreu um erro!", "Fechar");
      });
    } else {
      this.dataService.postTipoAtendimento(this.tipoatendimento).pipe(finalize(() => {
        this.dialogRef.close();
        this.openSnackBar("Salvo com sucesso!", "Fechar");
      })).subscribe(error => {
        this.dialogRef.close();
        this.openSnackBar("Ocorreu um erro!", "Fechar");
      });
    }
  }

  onCancelar() {
    this.dialogRef.close();
  }

  ngOnInit() {

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

}
