import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TombolaComponent } from './tombola/tombola.component';
import { TombolaService } from './tombola/tombola.service';

@NgModule({
  declarations: [
    AppComponent,
    TombolaComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [TombolaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
