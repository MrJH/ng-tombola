import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AsyncLocalStorageModule } from 'angular-async-local-storage';

import { AppComponent } from './app.component';
import { TombolaComponent } from './tombola/tombola.component';
import { TombolaService } from './tombola/tombola.service';
import { LOCALE_ID } from '@angular/core';


@NgModule({
  declarations: [
    AppComponent,
    TombolaComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AsyncLocalStorageModule
  ],
  providers: [
    TombolaService,
  { provide: LOCALE_ID, useValue: "de-DE" }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
