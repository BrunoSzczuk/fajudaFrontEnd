import { Injectable, EventEmitter } from '@angular/core';
import { Usuario } from './usuario';
import { Router } from '@angular/router';

export interface LoginContext{
  username : string;
  password : string;   
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioAuth: boolean = false;

  showMenuEmitter = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  doLogin(context : LoginContext){
    console.log(context.username);
    console.log(context.password);
    if (context.username === 'josegay' && context.password ==='sim'){
      this.usuarioAuth = true;

      this.showMenuEmitter.emit(true);

      this.router.navigate(['/']);

    }else{
      this.usuarioAuth = false;
      this.showMenuEmitter.emit(false); 
    }
  }

  usuarioAutenticado(){
    return this.usuarioAuth;
  }


}
