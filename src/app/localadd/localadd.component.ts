import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-localadd',
  templateUrl: './localadd.component.html',
  styleUrls: ['./localadd.component.scss']
})

export class LocaladdComponent implements OnInit {
  messageForm: FormGroup;

  constructor(private formBuilder: FormBuilder, 
    private data: DataService,
    public dialogRef: MatDialogRef<LocaladdComponent>) {

    this.messageForm = this.formBuilder.group({
      nameLocal: ['', Validators.required],
      statusLocal: ['', Validators.required],
      observacaoLocal: ['', Validators.required]
    })
  }

  onSubmit() {
    this.data.postLocal(this.messageForm.controls.nameLocal.value, 
        this.messageForm.controls.statusLocal.value,
        this.messageForm.controls.observacaoLocal.value);
    this.dialogRef.close();
  }

  onCancelar(){
    this.dialogRef.close();
  }

  ngOnInit() {

  }

}
