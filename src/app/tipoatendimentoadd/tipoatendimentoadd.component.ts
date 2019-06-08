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
  error : string;

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
      this.dataService.updateTipoAtendimento(this.tipoatendimento).subscribe( result => {
        this.dialogRef.close();
        this.openSnackBar("Salvo com sucesso!", "Fechar", 2000);
      }, error => {
        this.openSnackBar(this.error, "Fechar", 7000);
      });
    } else {
      this.dataService.postTipoAtendimento(this.tipoatendimento).subscribe( result => {
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
