import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-tipoatendimentoadd',
  templateUrl: './tipoatendimentoadd.component.html',
  styleUrls: ['./tipoatendimentoadd.component.scss']
})
export class TipoatendimentoaddComponent implements OnInit {
  messageForm: FormGroup;

  constructor(private formBuilder: FormBuilder, 
    private data: DataService,
    public dialogRef: MatDialogRef<TipoatendimentoaddComponent>) {
      this.messageForm = this.formBuilder.group({
        name: ['', Validators.required],
        status: ['', Validators.required]
      })
  }

  onSubmit() {
    this.data.postTipoAtendimento(this.messageForm.controls.name.value, 
      this.messageForm.controls.status.value);
      this.dialogRef.close();
  }

  onCancelar(){
    this.dialogRef.close();
  }

  ngOnInit() {

  }

}
