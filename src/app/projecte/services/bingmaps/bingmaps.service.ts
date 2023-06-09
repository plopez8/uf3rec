import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { bingmaps } from 'src/environments/bingmaps';
import { Coordenada } from '../../model/implementations/coordenada/coordenada';

@Injectable({
  providedIn: 'root'
})
export class BingmapsService {
  constructor(private http: HttpClient) { }

  getElevation(coordenada: Coordenada): any {
    return this.http.get(bingmaps.apiUrl+'/Elevation/List?points='+coordenada.latitud+','+coordenada.longitud+'&key=' + bingmaps.apiKey);
  }

  getImage(coordenada: Coordenada, zoom: number, view: string): any {
    return (bingmaps.apiUrl+'/Imagery/Map/'+view+'/'+coordenada.latitud+','+coordenada.longitud+'/'+zoom+'?&key=' + bingmaps.apiKey);
  }
}
