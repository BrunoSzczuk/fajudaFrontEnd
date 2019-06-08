import { TipoAtendimento } from "./tipoatendimento";
import { Local } from "./local";
import { Usuario } from "./usuario";
import { ItemAtendimento } from "./itemAtendimento";

export class Atendimento{
    cdAtendimento : number;
    dtAtendimento : Date;
    dtSolucao : Date;
    itematendimentos : ItemAtendimento[];
    local: Local;
    stAtendimento : string;
    usuarioAtendente : Usuario;
    usuarioSolicitante : Usuario;
}