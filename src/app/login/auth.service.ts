import { Injectable, EventEmitter } from '@angular/core';
import { Usuario } from './usuario';
import { Observable, Observer, of } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

var URL = "http://localhost:9090/";

export interface LoginContext{
  username : string;
  password : string;   
}

export interface Credentials {
  username : string;
  token: string;
}

const credentialsKey = 'credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _credentials: Credentials | null;
  private usuarioAuth: boolean = false;

  showMenuEmitter = new EventEmitter<boolean>();

  constructor(private router: Router,
              private http: HttpClient) { 
                const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }                  
                
              }

  doLogin(context : LoginContext): Observable <Credentials>{

    /*
    console.log(context.username);
    console.log(context.password);
    if (context.username === 'josegay' && context.password ==='sim'){
      this.usuarioAuth = true;

      this.showMenuEmitter.emit(true);

      this.router.navigate(['/']);

    }else{
      this.usuarioAuth = false;
      this.showMenuEmitter.emit(false); 
    }*/

    return Observable.create((observer: Observer<any>) => {

      return this.http.post(URL + 'auth',
        {username: context.username, password: context.password}).subscribe((response: any) => {
          if(response && response.access_token){
            const data = {
              username: context.username,
              token: response.access_token
            };
            //será que precisa???
            this.usuarioAuth = true;
            this.showMenuEmitter.emit(true);

            //
            this.setCredentials(data);
            observer.next(data);
            observer.complete();
          }else{
            //será que precisa???
            this.usuarioAuth = false;
            this.showMenuEmitter.emit(false); 

            //
            observer.error(response);
          }
        });
    });
  }

  usuarioAutenticado(){
    return this.usuarioAuth;
  }

  private setCredentials(credentials?: Credentials) {
    this._credentials = credentials || null;

    if (credentials) {
      const storage = localStorage;//const storage = remember ? localStorage : sessionStorage;
      storage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
    }
  }


}
