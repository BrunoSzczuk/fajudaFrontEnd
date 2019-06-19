import { Injectable, EventEmitter } from '@angular/core';
import { Usuario } from './usuario';
import { Observable, Observer, of, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { URL } from '../data.service';
import * as jwt_decode from 'jwt-decode';

export interface LoginContext {
  username: string;
  password: string;
}

export interface Credentials {
  username: string;
  token: string;
}

const credentialsKey = 'credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _credentials: Credentials | null;
  private usuarioAuth: boolean = false;

  showMenuEmitter = new BehaviorSubject<boolean>(false);

  constructor(private router: Router,
    private http: HttpClient) {
    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
      if (this.isTokenExpired(this._credentials.token)) {
        this.router.navigate(["/login"]);
        return;
      }
      this.usuarioAuth = true;
      this.showMenuEmitter.next(true);
    } else {
      this.router.navigate(["/login"]);
    }
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) token = this.getToken();
    if (!token) return true;

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

  doLogin(context: LoginContext): Observable<Credentials> {

    return Observable.create((observer: Observer<any>) => {
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        observe: 'response' as 'response'
      };
      return this.http.post(URL + 'login',
        { username: context.username, senha: context.password }, httpOptions)
        .subscribe((response: HttpResponse<any>) => {
          let token = response.headers.get('authorization')
          if (response && token) {

            const data = {
              username: context.username,
              token: token
            };
            //será que precisa???
            this.usuarioAuth = true;
            this.showMenuEmitter.next(true);

            //
            this.setCredentials(data);
            observer.next(data);
            observer.complete();
          } else {
            //será que precisa???
            this.usuarioAuth = false;
            this.showMenuEmitter.next(false);

            //
            observer.error(response);
          }
        });
    });
  }

  usuarioAutenticado() {
    return this.usuarioAuth;
  }

  getToken() {
    return this._credentials.token;
  }

  doLogout() {
    sessionStorage.removeItem(credentialsKey);
    localStorage.removeItem(credentialsKey);
    this.usuarioAuth = false;
    this.showMenuEmitter.next(false);
    this._credentials = null;
    this.router.navigate(["/login"])
  }

  get isLoggedIn() {
    return this.showMenuEmitter.asObservable(); // {2}
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
