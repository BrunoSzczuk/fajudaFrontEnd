import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var URL = "http://192.168.137.86:9090/";

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

  postLocal(descricao, status, obs) {
    this.http.post(URL + "locais", {
      "dsLocal": descricao,
      "stAtivo": status,
      "obsLocal": obs
    }).subscribe(status => console.log(JSON.stringify(status)));
  }

}
