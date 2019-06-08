import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Local } from 'src/models/local';
import { Response } from 'src/models/response';
import { Observable } from 'rxjs';
import { TipoAtendimento } from 'src/models/tipoatendimento';
import { Atendimento } from 'src/models/atendimento';
import { AuthService } from './login/auth.service';

export var URL = "http://192.168.137.145:9090/";

var FILTRO = "/filtro?";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  HEADER_TOKEN = {
    headers: new HttpHeaders({ "Authorization": this.authService.getToken() })
  }

  constructor(private http: HttpClient, private authService: AuthService) {

  }

  getTipoAtendimentos(): Observable<Response> {
    return this.http.get<Response>(URL + "tipoAtendimentos", this.HEADER_TOKEN);
  }

  postTipoAtendimento(tipoatendimento: TipoAtendimento): Observable<Object> {

    return this.http.post(URL + "tipoAtendimentos", tipoatendimento, this.HEADER_TOKEN);
  }
  updateTipoAtendimento(tipoatendimento: TipoAtendimento): Observable<Object> {
    return this.http.put(URL + "tipoAtendimentos/" + tipoatendimento.cdTipoatendimento, tipoatendimento, this.HEADER_TOKEN);
  }

  getLocais(): Observable<Response> {
    return this.http.get<Response>(URL + "locais", this.HEADER_TOKEN);
  }

  getLocaisByDsLocal(dsLocal) {
    return this.http.get<Response>(URL + "locais" + FILTRO + "dsLocal=" + dsLocal, this.HEADER_TOKEN);
  }

  postLocal(local: Local) {
    return this.http.post(URL + "locais", local, this.HEADER_TOKEN);
  }

  updateLocal(local: Local): Observable<Object> {
    return this.http.put(URL + "locais/" + local.cdLocal, local, this.HEADER_TOKEN);
  }

  postAtendimento(atendimento: Atendimento): Observable<Object> {
    return this.http.post(URL + "atendimentos/", atendimento, this.HEADER_TOKEN);
  }

  deleteLocal(id): Observable<Object> {
    return this.http.delete(URL + "locais/" + id, this.HEADER_TOKEN);
  }

  deleteTipoAtendimento(id): Observable<Object> {
    return this.http.delete(URL + "tipoAtendimentos/" + id, this.HEADER_TOKEN);
  }

  getAtendimentos() {
    return this.http.get<Response>(URL + "atendimentos", this.HEADER_TOKEN);
  }

  updateAtendimento(atendimento: Atendimento) {
    return this.http.put(URL + "atendimentos/" + atendimento.cdAtendimento, atendimento);
  }
}
