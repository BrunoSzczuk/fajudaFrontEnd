import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Local } from 'src/models/local';
import { Response } from 'src/models/response';
import { Observable } from 'rxjs';
import { TipoAtendimento } from 'src/models/tipoatendimento';

export var URL = "http://192.168.137.242:9090/";

var FILTRO = "/filtro?";


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getTipoAtendimentos() {
    return this.http.get<Response>(URL + "tipoAtendimentos");
  }

  postTipoAtendimento(tipoatendimento: TipoAtendimento): Observable<Object> {
    return this.http.post(URL + "tipoatendimento", tipoatendimento);
  }

  getLocais() {
    return this.http.get<Response>(URL + "locais");
  }

  getLocaisByDsLocal(dsLocal) {
    return this.http.get<Response>(URL + "locais" + FILTRO + "dsLocal=" + dsLocal);
  }

  postLocal(local: Local): Observable<Object> {
    return this.http.post(URL + "locais", local);
  }

  postAtendimento() {

  }

  deleteLocal(id) {
    console.log('id ' + id)
    this.http.delete(URL + "locais/" + id).subscribe(status => console.log(JSON.stringify(status)));
  }

  deleteTipoAtendimento(id){
    console.log('id ' + id)
    this.http.delete(URL + "tipoatendimento/" + id).subscribe(status => console.log(JSON.stringify(status)));
  }
}
