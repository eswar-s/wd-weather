import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { weathers } from './weather.store';

import { AppRoutingModule } from './app.routing';
import { ToastComponent } from './toast/toast.component';

import 'rxjs/add/operator/filter';



@NgModule({
  declarations: [
    AppComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    JsonpModule,
    FormsModule,
    AppRoutingModule,
    StoreModule.provideStore({ weathers: weathers })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
