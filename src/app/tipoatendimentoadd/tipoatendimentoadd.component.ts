import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
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
  constructor(private formBuilder: FormBuilder,

    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public dados: any,
    public dialogRef: MatDialogRef<TipoAtendimentoaddComponent>) {
    if (dados != "")
      this.tipoatendimento = dados;
    else
      this.tipoatendimento = new TipoAtendimento();
  }

  onSubmit() {
    this.dataService.postTipoAtendimento(this.tipoatendimento).pipe(finalize(() => {
      this.dialogRef.close();
    })).subscribe(error => {
      this.dialogRef.close();
    });

  }

  onCancelar() {
    this.dialogRef.close();
  }

  ngOnInit() {

  }

}
