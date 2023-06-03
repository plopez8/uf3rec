import { Component } from '@angular/core';
import { Coordenada } from '../../model/implementations/coordenada/coordenada';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  latitudMinima: number = 0;
  latitudMaxima: number = 0;
  longitudMinima: number = 0;
  longitudMaxima: number = 0;


  guardarDatos() {
    const coordenadaMinima = new Coordenada(this.latitudMinima, this.longitudMinima);
    const coordenadaMaxima = new Coordenada(this.latitudMaxima, this.longitudMaxima);
    console.log(coordenadaMinima);
    console.log(coordenadaMaxima);
  }
}
