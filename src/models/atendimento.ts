import { TipoAtendimento } from "./tipoatendimento";
import { Local } from "./local";

export class Atendimento{
    cdAtendimento : number;
    dtAtendimento : Date;
    dtSolucao : Date;
    local: Local;
    itemAtendimentos : TipoAtendimento[];
    stAtendimento : string;
}