import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { opentripmap } from 'src/environments/opentripmap';
@Injectable({
  providedIn: 'root'
})
export class OpentripmapService {
  // /en/places/bbox?lon_min=111&lon_max=1&lat_min=1&lat_max=1&format=json&apikey=5ae2e3f221c38a28845f05b602ceda497b722755efa3bf0d84db3d77
  constructor(private http: HttpClient) { }
  
  getInteresPoints(lon_min: number, lon_max: number, lat_min: number, lat_max: number): any {
    return this.http.get(opentripmap.apiUrl+'/en/places/bbox?lon_min='+lon_min+'&lon_max='+lon_max+'&lat_min='+lat_min+'&lat_max='+lat_max+'&format=json&apikey=' + opentripmap.apiKey);
  }
}
