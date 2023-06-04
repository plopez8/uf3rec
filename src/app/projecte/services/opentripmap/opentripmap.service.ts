import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { opentripmap } from 'src/environments/opentripmap';
@Injectable({
  providedIn: 'root'
})
export class OpentripmapService {
  constructor(private http: HttpClient) { }
  
  getInteresPoints(lon_min: number, lon_max: number, lat_min: number, lat_max: number): any {
    return this.http.get(opentripmap.apiUrl+'/en/places/bbox?lon_min='+lon_min+'&lon_max='+lon_max+'&lat_min='+lat_min+'&lat_max='+lat_max+'&format=json&apikey=' + opentripmap.apiKey);
  }
}
