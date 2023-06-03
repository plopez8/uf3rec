import { Component } from '@angular/core';
import { Coordenada } from '../../model/implementations/coordenada/coordenada';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  latitudText = "Latitud: --";
  longitudText = "Longitud: --";
  latitudMinima: number = 0;
  latitudMaxima: number = 0;
  longitudMinima: number = 0;
  longitudMaxima: number = 0;


  guardarDatos() {
    const coordenadaMinima = new Coordenada(this.latitudMinima, this.longitudMinima);
    const coordenadaMaxima = new Coordenada(this.latitudMaxima, this.longitudMaxima);
    this.latitudText = "Latitud: "+ coordenadaMinima.latitud + " - " + coordenadaMaxima.latitud;
    this.longitudText = "Longitud: "+ coordenadaMinima.longitud + " - " + coordenadaMaxima.longitud;
  }
  obtenerDatos() {
    console.log("obtenerDatos");
  }
}
