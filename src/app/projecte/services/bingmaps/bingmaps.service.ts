import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { bingmaps } from 'src/environments/bingmaps';

@Injectable({
  providedIn: 'root'
})
export class BingmapsService {
  constructor(private http: HttpClient) { }
  getElevation(lat: number, lon: number): any {
    return this.http.get(bingmaps.apiUrl+'/Elevation/List?points='+lat+','+lon+'&key=' + bingmaps.apiKey);
  }
  
}

