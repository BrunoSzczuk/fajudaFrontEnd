import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var URL = "http://localhost:9090/";
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
    return this.http.get(URL + "locais");
  }

  getLocaisByDsLocal(dsLocal) {
    return this.http.get(URL + "locais" + FILTRO + "dsLocal=" + dsLocal);
  }

  postLocal(descricao, status, obs) {
    this.http.post(URL + "locais", {
      "dsLocal": descricao,
      "stAtivo": status,
      "obsLocal": obs
    }).subscribe(status => console.log(JSON.stringify(status)));
  }

}
