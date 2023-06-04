import { IPuntsInteres } from "../../interfaces/puntsinteres/ipuntsinteres";

export class PuntsInteres implements IPuntsInteres{
    xid: number;
    nom: string;
    latitud: number;
    longitud: number;
    constructor(xid: number, nom: string, latitud: number, longitud: number){
        this.xid = xid;
        this.nom = nom;
        this.latitud = latitud;
        this.longitud = longitud;
    }
}