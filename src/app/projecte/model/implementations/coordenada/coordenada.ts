import { ICoordenada } from "../../interfaces/coordenada/icoordenada";

export class Coordenada implements ICoordenada{
    latitud: string;
    longitud: string;
    constructor(latitud: string, longitud: string){
        this.latitud = latitud;
        this.longitud = longitud;
    }
}