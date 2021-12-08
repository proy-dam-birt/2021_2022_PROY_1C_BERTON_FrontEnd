import { ComponentesModule } from './componentes/componentes.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { HttpService } from './services/http.service'; 

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Router } from '@angular/router';

import { Geolocation } from '@ionic-native/geolocation/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    ComponentesModule,
    HttpClientModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, Router],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },  Geolocation, HttpService],
  bootstrap: [AppComponent],
})
export class AppModule {}
