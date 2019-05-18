import { TipoAtendimento } from "./tipoatendimento";
import { Local } from "./local";
import { Usuario } from "src/app/login/usuario";

export class Atendimento{
    cdAtendimento : number;
    dtAtendimento : Date;
    dtSolucao : Date;
    itematendimentos : any[];
    local: Local;
    stAtendimento : string;
    usuarioAtendente : Usuario;
    usuarioSolicitante : Usuario;
}