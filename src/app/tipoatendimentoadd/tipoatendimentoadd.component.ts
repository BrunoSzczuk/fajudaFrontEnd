import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-tipoatendimentoadd',
  templateUrl: './tipoatendimentoadd.component.html',
  styleUrls: ['./tipoatendimentoadd.component.scss']
})
export class TipoatendimentoaddComponent implements OnInit {
  messageForm: FormGroup;
  submitted = false;
  success = false;

  constructor(private formBuilder: FormBuilder, private data: DataService,) {
    this.messageForm = this.formBuilder.group({
      name: ['', Validators.required],
      status: ['', Validators.required]
    })
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.messageForm.controls.name);
    console.log(this.messageForm.controls.status);
    this.data.postTipoAtendimento(this.messageForm.controls.name.value, this.messageForm.controls.status.value);
    this.success = true;
  }

  ngOnInit() {
  }

}
