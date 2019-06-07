import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Usuario } from './usuario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Globals } from '../globals';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: string;
  private usuario: Usuario = new Usuario();

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService) {
    this.createForm();
  }

  ngOnInit() {
  }

  doLogin() {
    this.authService.doLogin(this.loginForm.value)
      .subscribe(
        credentials => {
          this.router.navigate(['/'], { replaceUrl: true });
          Globals.login = ""
          Globals.senha = ""
        }, error => {
          this.error = error.errors[0].detail;
        }
      );
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]//,
      //remember: true
    });
  }

}
