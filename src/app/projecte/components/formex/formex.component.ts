import { Component } from '@angular/core';
import { Coordenada } from '../../model/implementations/coordenada/coordenada';
import { InteresStats } from '../../model/implementations/interesstats/interesstats';
import { OpentripmapService } from '../../services/opentripmap/opentripmap.service';

@Component({
  selector: 'app-formex',
  templateUrl: './formex.component.html',
  styleUrls: ['./formex.component.css']
})
export class FormexComponent {
  latitudText = "Latitud: --";
  longitudText = "Longitud: --";
  errorText = "";
  text2 = "";

  examlong = "";
  examlat = "";
  examnom = "";
  examcat = "";
  examval = "";

  latitudMinima: number = 0;
  latitudMaxima: number = 0;
  longitudMinima: number = 0;
  longitudMaxima: number = 0;
  examcatinput: string = "";
  examvalinput: number = 0;
  coordenadaMinima = new Coordenada(this.latitudMinima, this.longitudMinima);
  coordenadaMaxima = new Coordenada(this.latitudMaxima, this.longitudMaxima);
  puntsInteresSet = new Set<string>();
  puntsInteresArray: InteresStats[] = [];
  puntInteresSelect = new InteresStats(0, "null", 0, 0, "", 0);
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
          if (this.examcatinput != "") {
            this.opentripmapService.getPointsStatsCategory(this.coordenadaMinima, this.coordenadaMaxima, this.examcatinput, this.examvalinput)
            .subscribe((data: any) => {
              data.forEach((element: any) => {
                if (!this.puntsInteresSet.has(element.xid)) {
                  const puntinteres = new InteresStats(element.xid, element.name, element.point.lat, element.point.lon, element.kinds, element.rate);
                  this.puntsInteresArray.push(puntinteres);
                  this.puntsInteresSet.add(element.xid);
                }
              });
              console.log(data);
            }, (error: any) => {
              console.error(error);
              this.errorText = "Categoria invailda";
            });
          } else {
            this.opentripmapService.getPointsStats(this.coordenadaMinima, this.coordenadaMaxima, this.examvalinput)
            .subscribe((data: any) => {
              data.forEach((element: any) => {
                if (!this.puntsInteresSet.has(element.xid)) {
                  const puntinteres = new InteresStats(element.xid, element.name, element.point.lat, element.point.lon, element.kinds, element.rate);
                  this.puntsInteresArray.push(puntinteres);
                  this.puntsInteresSet.add(element.xid);
                }
              });
              console.log(data);
            }, (error: any) => {
              console.error(error);
              this.errorText = "Categoria invailda";
            });
          }
        }else{
          this.errorText = "La longitud mínima no puede ser mayor que la máxima";
        }
        
      }else{
        this.errorText = "La latitud mínima no puede ser mayor que la máxima";
      }
    }else{
      this.errorText = "Els valors no son valids";
    }
  }
  obtenerDatos() {
    if(this.puntInteresSelect.nom == "null"){
      this.text2 = "No s'ha seleccionat punt d'interes";
      this.examlat = "";
      this.examlong = "";
      this.examnom = "";
      this.examcat = "";
      this.examval = "";

    }else{
      this.text2 = "";
      this.examlat = "Latitud:"+this.puntInteresSelect.latitud;
      this.examlong = "Longitud:"+this.puntInteresSelect.longitud;
      this.examnom = "Nom:"+this.puntInteresSelect.nom;
      this.examcat = "Categoria:"+this.puntInteresSelect.categories;
      this.examval = "Valoració:"+this.puntInteresSelect.valoracio;
    }
  }
}
