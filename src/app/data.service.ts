import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Local } from 'src/models/local';
import { Response } from 'src/models/response';
import { Observable } from 'rxjs';

export var URL = "http://localhost:9090/";

var FILTRO = "/filtro?";


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getTipoAtendimentos() {
    return this.http.get(URL + "tipoAtendimentos");
  }

  postTipoAtendimento(descricao, status) {
    this.http.post(URL + "tipoAtendimentos", {
      "dsTipoatendimento": descricao,
      "stAtivo": status
    }).subscribe(status => console.log(JSON.stringify(status)));
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
}
