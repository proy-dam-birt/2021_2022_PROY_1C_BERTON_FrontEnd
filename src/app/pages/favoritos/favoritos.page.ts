import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import  *  as Constants from "../../constants/constants";
import { DetalleResultadosPage } from '../detalle-resultados/detalle-resultados.page';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {

  public avatarHotel = Constants.AVA_HOTEL;
  public avatarRestaurante = Constants.AVA_RESTAURANT;
  public avatarCasaRural = Constants.AVA_RURAL;
  public avatarOferta = Constants.AVA_OFERTA;

  constructor(public storageService: StorageService, private modalController:ModalController) {
 
   }

  ngOnInit() {
  }

    /**
   * Abre la modal para mostrar el detalle del establecimiento que no sea de ofertas
   * seleccionado.
   * @param item
   */
     async abrirModalNoOfertas(item:any){
      const modal = await this.modalController.create({
        component: DetalleResultadosPage,
        componentProps: {
          'municipio': item.properties.municipality,
          'territorio': item.properties.territory,
          'nombre': item.properties.documentname,
          'descripcion': item.properties.turismdescription,
          'web': item.properties.web
        }
      });
      await modal.present();
    }


    /**
   * Abre la modal para mostrar el detalle de una oferta
   * seleccionado.
   * @param item
   */
     async abrirModalOfertas(item:any){
      const modal = await this.modalController.create({
        component: DetalleResultadosPage,
        componentProps: {
          'municipio': item.properties.municipality,
          'territorio': item.properties.territory,
          'nombre': item.properties.documentname,
          'descripcion': item.properties.documentdescription,
          'web': item.properties.friendlyurl,
        }
      });
      await modal.present();
    }
}
