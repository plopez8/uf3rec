import { IInteresStats } from "../../interfaces/interesstats/iinteresstats";

export class InteresStats implements IInteresStats{
    xid: number;
    nom: string;
    latitud: number;
    longitud: number;
    categories: string;
    valoracio: number;
    constructor(xid: number, nom: string, latitud: number, longitud: number, categories: string, valoracio: number){
        this.xid = xid;
        this.nom = nom;
        this.latitud = latitud;
        this.longitud = longitud;
        this.categories = categories;
        this.valoracio = valoracio;
    }
}