import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { WeatherService } from './weather.service';
import { ToastService } from './toast/toast.service';

import { WeatherCityListComponent } from './weather-city-list/weather-city-list.component';
import { WeatherCityComponent } from './weather-city/weather-city.component';

const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', pathMatch: 'full', component: WeatherCityListComponent },
            { path: ':city', pathMatch: 'full', component: WeatherCityComponent}
        ]
    }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: [
    WeatherCityListComponent,
    WeatherCityComponent
  ],
  providers: [
    WeatherService,
    ToastService
  ]
})

export class AppRoutingModule { }
