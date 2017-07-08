import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { WeatherService } from '../weather.service';

@Component({
  selector: 'wd-weather-city',
  templateUrl: './weather-city.component.html',
  styleUrls: ['./weather-city.component.scss']
})
export class WeatherCityComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  private weatherList: any[];
  weatherData: any[];

  constructor(private route: ActivatedRoute, private weatherService: WeatherService, private router: Router) {
     this.weatherService.weathers.subscribe(data => {
       this.weatherList = [];
       data.forEach(x => this.weatherList.push(Object.assign({}, x)));
     });
  }

  getWeatherClass(value: string): string {
    const code = Number(value);
    let cssClassName = '';
    if (code === 3 || code === 4 || code === 37 || code === 38 || code === 39) {
      cssClassName = 'thunderstorms';
    } else if (code >= 5 && code <= 12 || code === 40 || code === 45) {
      cssClassName = 'rain';
    } else if (code >= 13 && code <= 23 || code === 41 || code === 42 || code === 43) {
      cssClassName = 'snow';
    } else if (code === 24) {
      cssClassName = 'windy';
    } else if (code === 25) {
      cssClassName = 'cold';
    } else if (code >= 26 && code <= 30 || code === 44) {
      cssClassName = 'cloudy';
    } else if (code === 32 || code === 36) {
      cssClassName = 'sunny';
    }  else if (code === 47) {
      cssClassName = 'thundershowers';
    }
    return cssClassName;
  }
  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      let tempWeatherData = this.weatherList.filter(weather => {
        return weather.location.city === params['city'];
      });

      if (tempWeatherData && tempWeatherData.length > 0) {
          this.weatherData = [];
          tempWeatherData[0]['item']['forecast'].forEach(x => {
            this.weatherData.push(Object.assign({}, x));
          });
          this.weatherData = this.weatherData.splice(0, 6);
      } else {
        this.weatherService.getWeatherByCity(params['city']).subscribe(data => {
          if (data['_body'] && data['_body']['query'] && data['_body']['query']['count'] === 1) {
            this.weatherData = data['_body']['query']['results']['channel']['item']['forecast'].splice(0, 6);
          } else {
            this.router.navigate(['/']);
          }
        });
      }

    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
