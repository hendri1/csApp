import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

const config = {
  apiKey: "AIzaSyBGahPzmjm99Kuteg279Q-GfJA4bfyBqOw",
  authDomain: "credit-spring.firebaseapp.com",
  databaseURL: "https://csapp-232404.firebaseio.com",
  projectId: "credit-spring",
  storageBucket: "credit-spring.appspot.com",
  messagingSenderId: "362179339793"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [],
  imports: [
    BrowserAnimationsModule,
    BrowserModule, 
    HttpModule,
    IonicModule.forRoot(), 
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GooglePlus,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
