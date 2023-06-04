import { Component } from '@angular/core';
import { Coordenada } from '../../model/implementations/coordenada/coordenada';
import { PuntsInteres } from '../../model/implementations/puntsinteres/puntsinteres';
import { OpentripmapService } from '../../services/opentripmap/opentripmap.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  latitudText = "Latitud: --";
  longitudText = "Longitud: --";
  errorText = "";
  text2 = "";
  latitudMinima: number = 0;
  latitudMaxima: number = 0;
  longitudMinima: number = 0;
  longitudMaxima: number = 0;
  coordenadaMinima = new Coordenada(this.latitudMinima, this.longitudMinima);
  coordenadaMaxima = new Coordenada(this.latitudMaxima, this.longitudMaxima);
  puntsInteresSet = new Set<string>();
  puntsInteresArray: PuntsInteres[] = [];
  puntInteresSelect = new PuntsInteres(0, "null", 0, 0);
  constructor(private opentripmapService: OpentripmapService) {}

  guardarDatos() {
    this.coordenadaMinima.latitud = this.latitudMinima;
    this.coordenadaMinima.longitud = this.longitudMinima;
    this.coordenadaMaxima.latitud = this.latitudMaxima;
    this.coordenadaMaxima.longitud = this.longitudMaxima;
    this.latitudText = "Latitud: "+ this.coordenadaMinima.latitud + " - " + this.coordenadaMaxima.latitud;
    this.longitudText = "Longitud: "+ this.coordenadaMinima.longitud + " - " + this.coordenadaMaxima.longitud;
    if (this.coordenadaMinima.longitud > -90 && this.coordenadaMinima.longitud < 90 && this.coordenadaMaxima.latitud > -90 && this.coordenadaMaxima.latitud < 90 && this.coordenadaMaxima.longitud > -90 && this.coordenadaMaxima.longitud < 90 && this.coordenadaMinima.longitud > -90 && this.coordenadaMinima.longitud < 90) {

      if(this.coordenadaMinima.latitud <= this.coordenadaMaxima.latitud){
        if(this.coordenadaMinima.longitud <= this.coordenadaMaxima.longitud){
          this.errorText="";
          this.opentripmapService.getInteresPoints(this.coordenadaMinima.longitud, this.coordenadaMaxima.longitud, this.coordenadaMinima.latitud, this.coordenadaMaxima.latitud)
          .subscribe((data: any) => {
            console.log(data);
            data.forEach((element: any) => {
              if (!this.puntsInteresSet.has(element.xid)) {
                const puntinteres = new PuntsInteres(element.xid, element.name, element.point.lat, element.point.lon);
                this.puntsInteresArray.push(puntinteres);
                this.puntsInteresSet.add(element.xid);
              }
            });
          }, (error: any) => {
            console.error(error);
          });
        }else{
          this.errorText = "La longitud mínima no puede ser mayor que la máxima";
        }
        
      }else{
        this.errorText = "La latitud mínima no puede ser mayor que la máxima";
      }
    }else{
      this.errorText = "Els valors no son valids";
    }
    console.log(this.puntsInteresArray);
  }
  obtenerDatos() {
    console.log("this.puntInteresSelect");
    console.log(this.puntInteresSelect.nom);
    if(this.puntInteresSelect.nom == "null"){
      this.text2 = "No s'ha seleccionat punt d'interes";
      console.log("if"); 
    }else{
      this.text2 = "";
      console.log("else"); 
      console.log(this.puntInteresSelect.longitud); 
      console.log(this.puntInteresSelect.latitud); 
    }
  }
}
