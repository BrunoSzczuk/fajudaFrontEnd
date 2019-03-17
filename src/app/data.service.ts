import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var URL = "http://localhost:9090/tipoAtendimentos";
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getTipoAtendimentos() {
    return this.http.get(URL);
  }

  postTipoAtendimento(descricao, status) {
    this.http.post(URL, {
      "dsTipoatendimento": descricao,
      "stAtivo": status
    }).subscribe(status => console.log(JSON.stringify(status)));
  }
}
