import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Storage } from '@Capacitor/storage'; 

import { Hoteles, Restaurantes, CasasRurales, Ofertas} from '../interfaces/bertoninterfaces';

@Injectable({
  providedIn: 'root'
})



export class StorageService {

  private keyRestaurantes:string = "restaurantesAlmacenados"; 
  private keyHoteles:string = "hotelesAlmacenados"; 
  private keyCasasRurales:string = "casasRuralesAlmacenados"; 
  private keyOfertas:string = "ofertasAlmacenados"; 

  private restaurantesFavoritos:Restaurantes[]=[]; 
  private hotelesFavoritos:Hoteles[]=[]; 
  private casasRuralesFavoritos:CasasRurales[]=[]; 
  private ofertasFavoritos:Ofertas[]=[]; 
  
  constructor() 
  { 
    
  }


  // Almacena un objeto con formato JSON en local.
  // Por cada objeto, se necesita una clave (key) y el valor del objeto (value)
  private async setObject(key: string, value: any) {
    await Storage.set({ key, value: JSON.stringify(value) });
  }

  // A partir de su clave obtiene un objeto almacenado en local
  // Antes de devolverlo, debe ser convertido de formato JSON a formato normal
  private async getObject(key: string) {
    const ret = await Storage.get({ key });
    return JSON.parse(ret.value);
  }

  // Vacía el almacenamiento local
  private async clear() {
    await Storage.clear();
  }

  // Carga en el array de restaurantes favoritos el contenido del storage
  private ObtenerRestaurantesFavoritos()
  {
    // Obtenemos la promesa que devuelve getObject(). Debemos indicar el tipo de dato que estamos leyendo
    let datosPromesa: Promise<Restaurantes[]> = this.getObject(this.keyRestaurantes);
    
    // si hay restaurantes en el storage los cargamos en nuestro array
    datosPromesa.then( (data) => {
      if(data) {
        this.restaurantesFavoritos.push(...data);
      }
    });
    
  }

  // Carga en el array de hoteles favoritos el contenido del storage
  private ObtenerHotelesFavoritos()
  {
    // Obtenemos la promesa que devuelve getObject(). Debemos indicar el tipo de dato que estamos leyendo
    let datosPromesa: Promise<Hoteles[]> = this.getObject(this.keyHoteles);
    
    // si hay hoteles en el storage los cargamos en nuestro array
    datosPromesa.then( (data) => {
      if (data) {
        this.hotelesFavoritos.push(...data); 
      }
    }) 
  }

  // Carga en el array de casas rurales favoritos el contenido del storage
  private obtenerCasasRuralesFavoritos()
  {
    // Obtenemos la promesa que devuelve getObject(). Debemos indicar el tipo de dato que estamos leyendo
    let datosPromesa: Promise<CasasRurales[]> = this.getObject(this.keyCasasRurales);
    
    // si hay casas rurales en el storage los cargamos en nuestro array
    datosPromesa.then( (data) => {
      if (data) {
        this.casasRuralesFavoritos.push(...data); 
      }
    }) 
  }

  // Carga en el array de ofertas favoritos el contenido del storage
  private obtenerOfertasFavoritos()
  {
    // Obtenemos la promesa que devuelve getObject(). Debemos indicar el tipo de dato que estamos leyendo
    let datosPromesa: Promise<Ofertas[]> = this.getObject(this.keyOfertas);
    // Con then() ejecutamos el código que queremos que procese los datos recibidos
    datosPromesa.then( (data) => {
      if (data) {
        this.ofertasFavoritos.push(...data); 
      }
    }) 
  }

  // carga en los cuatro arrays de favoritos el contenido del storage
  public obtenerFavoritos()
  {
    this.ObtenerRestaurantesFavoritos(); 
    this.ObtenerHotelesFavoritos(); 
    this.obtenerCasasRuralesFavoritos(); 
    this.obtenerOfertasFavoritos(); 
  }

  // devuelve el array de restaurantes favoritos
  public getRestaurantesFavoritos():Restaurantes[]
  {
    return this.restaurantesFavoritos; 
  }

  // devuelve el array de hoteles favoritos
  public getHotelesFavoritos():Hoteles[]
  {
    return this.hotelesFavoritos; 
  }

  // devuelve el array de casas rurales favoritas
  public getCasasRuralesFavoritos():CasasRurales[]
  {
    return this.casasRuralesFavoritos; 
  }

  // devuelve el array de ofertas favoritas
  public getOfertasFavoritos():Ofertas[]
  {
    return this.ofertasFavoritos; 
  }

  // marca el restaurante como favorito y lo añade al storage
  public aniadirRestauranteFavorito(restauranteFavorito:Restaurantes)
  {
    let esEncontradoRestaurante: boolean = false;
    // si no es favorito lo añado
    // el array esta vacio, lo inserto
    if (this.restaurantesFavoritos.length == 0) {
      this.restaurantesFavoritos = [...this.restaurantesFavoritos, restauranteFavorito];
      this.setObject(this.keyRestaurantes, this.restaurantesFavoritos);   
    }
    else {
      // recorro el array
      this.restaurantesFavoritos.forEach(restaurante => {
        console.log("dentro del foreach");
        if (restauranteFavorito.properties.friendlyurl == restaurante.properties.friendlyurl) {
          esEncontradoRestaurante = true;
        }
      });
      // lo añado si no esta en el array
      if (!esEncontradoRestaurante) {
        this.restaurantesFavoritos = [...this.restaurantesFavoritos, restauranteFavorito];
        this.setObject(this.keyRestaurantes, this.restaurantesFavoritos);   
      }
    }

    
  }

  public quitarRestauranteFavorito(indice: number)
  {
    let restaurantesInicio = this.restaurantesFavoritos.slice(0, indice); // Copia primera parte del array
    let restaurantesFinal= this.restaurantesFavoritos.slice(indice + 1); // Copia la parte final
    this.restaurantesFavoritos = [...restaurantesInicio, ...restaurantesFinal]; // Añade todos los elementos copiados
    this.setObject(this.keyRestaurantes, this.restaurantesFavoritos); 
  }

  public aniadirHotelFavorito(hotelFavorito:Hoteles)
  {
    this.hotelesFavoritos = [...this.hotelesFavoritos, hotelFavorito];
    this.setObject(this.keyHoteles, this.hotelesFavoritos); 
  }

  public quitarHotelFavorito(indice: number)
  {
    let hotelesInicio = this.hotelesFavoritos.slice(0, indice); // Copia primera parte del array
    let hotelesFinal= this.hotelesFavoritos.slice(indice + 1); // Copia la parte final
    this.hotelesFavoritos = [...hotelesInicio, ...hotelesFinal]; // Añade todos los elementos copiados
    this.setObject(this.keyHoteles, this.hotelesFavoritos); 
  }

  public aniadirCasaRuralFavorito(casaRuralFavorito:CasasRurales)
  {
    this.casasRuralesFavoritos = [...this.casasRuralesFavoritos, casaRuralFavorito];
    this.setObject(this.keyCasasRurales, this.casasRuralesFavoritos); 
  }

  public quitarCasaRuralFavorito(indice: number)
  {
    let casasRuralesInicio = this.casasRuralesFavoritos.slice(0, indice); // Copia primera parte del array
    let casasRuralesFinal= this.casasRuralesFavoritos.slice(indice + 1); // Copia la parte final
    this.casasRuralesFavoritos = [...casasRuralesInicio, ...casasRuralesFinal]; // Añade todos los elementos copiados
    this.setObject(this.keyCasasRurales, this.casasRuralesFavoritos); 
  }

  public aniadirOfertaFavorito(ofertaFavorito:Ofertas)
  {
    this.ofertasFavoritos = [...this.ofertasFavoritos, ofertaFavorito];
    this.setObject(this.keyOfertas, this.ofertasFavoritos); 
  }

  public quitarOfertaFavorito(indice: number)
  {
    let ofertasInicio = this.ofertasFavoritos.slice(0, indice); // Copia primera parte del array
    let ofertasFinal= this.ofertasFavoritos.slice(indice + 1); // Copia la parte final
    this.ofertasFavoritos = [...ofertasInicio, ...ofertasFinal]; // Añade todos los elementos copiados
    this.setObject(this.keyOfertas, this.ofertasFavoritos); 
  }

  public borrarFavoritos()
  {
    this.restaurantesFavoritos = [];
    this.hotelesFavoritos = []; 
    this.casasRuralesFavoritos = []; 
    this.ofertasFavoritos = []; 
    this.clear(); 
  }

}
