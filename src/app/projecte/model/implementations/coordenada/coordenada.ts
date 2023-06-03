import { ICoordenada } from "../../interfaces/coordenada/icoordenada";

export class Coordenada implements ICoordenada{
    latitud: number;
    longitud: number;
    constructor(latitud: number, longitud: number){
        this.latitud = latitud;
        this.longitud = longitud;
    }
}