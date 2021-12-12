import { GeolocationService } from 'src/app/services/geolocation.service';
import { Component, Input, OnInit } from '@angular/core';
import { Hoteles, Restaurantes, CasasRurales, Ofertas} from '../../interfaces/bertoninterfaces';
import { HttpService } from 'src/app/services/http.service';
import { NavigationExtras, Route, Router } from '@angular/router';
import  *  as Constants from "../../constants/constants";

@Component({
  selector: 'app-categoria-inicio-rurales',
  templateUrl: './categoria-inicio-rurales.component.html',
  styleUrls: ['./categoria-inicio-rurales.component.scss'],
})
export class CategoriaInicioRuralesComponent implements OnInit {

  @Input() titulo: string; //Se convertirá en un objeto establecimiento para rellenar las tarjetas
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 2,
  };
  rurales: Hoteles[]= [];
  establecimiento:string = "";
  enlace:string="";
  nombreIcono:string="";
  longitud: number = 0;
  latitud: number = 0;

  constructor(private httpService: HttpService, private router:Router, private geoService:GeolocationService) { }

  ngOnInit() {
    this.geoService.actualizarPosicion()
     .then(() => {
        this.latitud = this.geoService.getLatitude();
        this.longitud = this.geoService.getLongitude();
        this.cargaComponente();
      });
      
  }

  cargaComponente() {

    this.establecimiento = "Casa Rural";

        this.httpService.getByGeoCasasRurales(this.longitud, this.latitud, 20, "Agroturismos")
          .subscribe(resp => {
            this.rurales = resp.slice(0,2);
          });
          
        this.nombreIcono = Constants.ICON_RURAL;
  }

  

  /**
   * Abre la página de resultados del tipo de establecimiento seleccionado
   */
  abreResultado() {
    let navExtras:NavigationExtras = {
      queryParams: {
        clase: this.establecimiento
      }
    }
    this.router.navigate(['/resultados'], navExtras);
  }
}