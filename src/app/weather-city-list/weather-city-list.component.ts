import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { WeatherService } from '../weather.service';

@Component({
  selector: 'wd-weather-city-list',
  templateUrl: './weather-city-list.component.html',
  styleUrls: ['./weather-city-list.component.scss']
})
export class WeatherCityListComponent implements OnInit {

  weathers: Observable<Array<any>>;

  constructor(private weatherService: WeatherService, private router: Router) {
    this.weathers = weatherService.weathers;
  }

  ngOnInit() {

  }

  viewWeatherInDetail(city: string) {
    this.router.navigate(['/' + city]);
  }

  deleteWeather(data: any) {
    this.weatherService.deleteWeatherInStore(data);
  }

  stringAsDate(value: string): Date {
    let date = new Date(value.substr(5).substr(0, 11).toUpperCase());
    if (value.substr(23, 2) === 'PM') {
      date.setHours(Number(value.substr(17, 2)) + 12);
    } else {
      date.setHours(Number(value.substr(17, 2)));
    }
    date.setMinutes(Number(value.substr(20, 2)));
    return date;
  }

}
