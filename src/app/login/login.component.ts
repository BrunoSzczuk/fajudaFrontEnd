import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Usuario } from './usuario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  private usuario : Usuario = new Usuario();

  constructor(private formBuilder: FormBuilder,
              private authService : AuthService) { 
                this.createForm();
              }

  ngOnInit() {
  }

  doLogin(){
    this.authService.doLogin(this.loginForm.value)
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]//,
      //remember: true
    });
  }  

}
