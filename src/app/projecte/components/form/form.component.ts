import { Component } from '@angular/core';
import { Coordenada } from '../../model/implementations/coordenada/coordenada';
import { PuntsInteres } from '../../model/implementations/puntsinteres/puntsinteres';
import { OpentripmapService } from '../../services/opentripmap/opentripmap.service';
import { BingmapsService } from '../../services/bingmaps/bingmaps.service';
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
  copy = "";
  logourl = "";
  typeview = "";
  imagemap = "";
  hidediv = false;
  typeviews = [
    { text: "Aerial", value: "Aerial" },
    { text: "Aerial With Lables On Demand", value: "AerialWithLabelsOnDemand" },
    { text: "Birdseye", value: "null" },
    { text: "Birdseye2", value: "null" },
    { text: "Birdseye With Labels", value: "null" },
    { text: "Birdseye V2 With Labels", value: "null" },
    { text: "Canvas Dark", value: "CanvasDark" },
    { text: "Canvas Light", value: "CanvasLight" },
    { text: "Canvas Gray", value: "CanvasGray" },
    { text: "Ordnance Survey", value: "null" },
    { text: "Road On Demand", value: "Road" },
    { text: "Streetside", value: "Streetside" }
  ];
  latitudMinima: number = 0;
  latitudMaxima: number = 0;
  longitudMinima: number = 0;
  longitudMaxima: number = 0;
  zoomView: number = 0;
  coordenadaMinima = new Coordenada(this.latitudMinima, this.longitudMinima);
  coordenadaMaxima = new Coordenada(this.latitudMaxima, this.longitudMaxima);
  puntsInteresSet = new Set<string>();
  puntsInteresArray: PuntsInteres[] = [];
  puntInteresSelect = new PuntsInteres(0, "null", 0, 0);
  constructor(private opentripmapService: OpentripmapService, private bingmapsService: BingmapsService) {}

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
          this.opentripmapService.getInteresPoints(this.coordenadaMinima, this.coordenadaMaxima)
          .subscribe((data: any) => {
            data.forEach((element: any) => {
              if (!this.puntsInteresSet.has(element.xid)) {
                const puntinteres = new PuntsInteres(element.xid, element.name, element.point.lat, element.point.lon);
                this.puntsInteresArray.push(puntinteres);
                this.puntsInteresSet.add(element.xid);
              }
            });
            if (this.puntsInteresSet.size > 0) {
              this.hidediv = true;
              if (!this.typeview) {
                this.typeview = "Aerial";
              }
            }     
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
  }
  obtenerDatos() {
    if(this.puntInteresSelect.nom == "null"){
      this.text2 = "No s'ha seleccionat punt d'interes";
      this.logourl = "";
      this.copy = "";
    }else{
      this.text2 = "";
      this.bingmapsService.getElevation( this.puntInteresSelect)
          .subscribe((data: any) => {
            this.text2 = "Altura sobre el nivell del mar: "+data.resourceSets[0].resources[0].elevations[0];
            this.logourl = data.brandLogoUri;
            this.copy = data.copyright;
          }, (error: any) => {
            console.error(error);
            this.logourl = "";
            this.copy = "";
          });
          this.changeTypeView();
    }

  }

  changeTypeView(){
    if (this.puntInteresSelect.nom == "null") {
      alert("No s'ha seleccionat punt");
    }else{
      if(this.typeview == "null"){
        alert("No se permite esta vista");
      }else{
        if(this.zoomView <= 20 && this.zoomView >= 0){
          this.imagemap = this.bingmapsService.getImage(this.puntInteresSelect, this.zoomView, this.typeview)
        }else{
          alert("Zoom te que estar entre 0 i 20");
        }
      }
    }
  }

  onTypeviewChange() {
        this.changeTypeView();
  }

}
