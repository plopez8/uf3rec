import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BingmapsService {
  constructor(private http: HttpClient) { }
  // http://dev.virtualearth.net/REST/v1/Elevation/List?points=35.89431,-110.72522&key={BingMapsKey}
  // http://dev.virtualearth.net/REST/v1/Elevation/List?points=35.89431,-110.72522,35.89393,-110.72578,35.89374,-110.72606,35.89337,-110.72662&key={BingMapsKey}
  
}