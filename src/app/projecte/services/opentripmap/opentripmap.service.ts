import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { opentripmap } from 'src/environments/opentripmap';
import { Coordenada } from '../../model/implementations/coordenada/coordenada';

@Injectable({
  providedIn: 'root'
})
export class OpentripmapService {
  constructor(private http: HttpClient) { }
  
  getInteresPoints(coordenadaMinima: Coordenada, coordenadaMaxima: Coordenada): any {
    return this.http.get(opentripmap.apiUrl+'/en/places/bbox?lon_min='+coordenadaMinima.longitud+'&lon_max='+coordenadaMaxima.longitud+'&lat_min='+coordenadaMinima.latitud+'&lat_max='+coordenadaMaxima.latitud+'&format=json&apikey=' + opentripmap.apiKey);
  }

  getPointsStats(coordenadaMinima: Coordenada, coordenadaMaxima: Coordenada, rate: number): any {
    return this.http.get(opentripmap.apiUrl+'/en/places/bbox?lon_min='+coordenadaMinima.longitud+'&lon_max='+coordenadaMaxima.longitud+'&lat_min='+coordenadaMinima.latitud+'&lat_max='+coordenadaMaxima.latitud+'&rate='+rate+'&format=json&apikey=' + opentripmap.apiKey);
  }

  getPointsStatsCategory(coordenadaMinima: Coordenada, coordenadaMaxima: Coordenada, kinds: string, rate: number): any {
    return this.http.get(opentripmap.apiUrl+'/en/places/bbox?lon_min='+coordenadaMinima.longitud+'&lon_max='+coordenadaMaxima.longitud+'&lat_min='+coordenadaMinima.latitud+'&lat_max='+coordenadaMaxima.latitud+'&kinds='+kinds+'&rate='+rate+'&format=json&apikey=' + opentripmap.apiKey);
  }
}
