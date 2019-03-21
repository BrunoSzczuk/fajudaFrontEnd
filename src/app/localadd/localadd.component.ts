import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-localadd',
  templateUrl: './localadd.component.html',
  styleUrls: ['./localadd.component.scss']
})

export class LocaladdComponent implements OnInit {
  messageForm: FormGroup;
  submitted = false;
  success = false;

  constructor(private formBuilder: FormBuilder, private data: DataService,) {
    this.messageForm = this.formBuilder.group({
      nameLocal: ['', Validators.required],
      statusLocal: ['', Validators.required],
      observacaoLocal: ['', Validators.required]
    })
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.messageForm.controls.name);
    console.log(this.messageForm.controls.status);
    this.data.postLocal(this.messageForm.controls.nameLocal.value, 
      this.messageForm.controls.statusLocal.value,
      this.messageForm.controls.observacaoLocal.value);
    this.success = true;
  }

  ngOnInit() {
  }

}
