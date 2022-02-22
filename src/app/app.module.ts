import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { SETTINGS as AUTH_SETTINGS } from '@angular/fire/compat/auth';
import { provideAuth,getAuth } from '@angular/fire/auth';

//import { AppRoutingModule } from './app-routing.module';
//import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { provideDatabase,getDatabase } from '@angular/fire/database';
//import { AuthenticationService } from './services/Authentication.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), 
  AppRoutingModule,
  provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideAuth(() => getAuth()),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
