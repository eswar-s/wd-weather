import { Component, OnInit } from '@angular/core';

import { WeatherService } from '../weather.service';

@Component({
  selector: 'wd-open-weather',
  templateUrl: './open-weather.component.html',
  styleUrls: ['./open-weather.component.scss']
})
export class OpenWeatherComponent implements OnInit {

  cityName: string;
  weatherData: {date: string, info: any[]}[];

  constructor(private weatherService: WeatherService) {
    this.weatherService.getOpenWeather('4517009').subscribe(data => {
      this.cityName = data['_body']['city']['name'];
      const listOfWeathers: any[] = data['_body']['list'];
      this.weatherData = [];
      if (listOfWeathers && listOfWeathers.length > 0) {

        listOfWeathers.forEach(x => {
          const date = x['dt_txt'].slice(0, 11);
          const weathersForSpecificDate = this.weatherData.find(item => item.date === date);
          if (weathersForSpecificDate) {
            weathersForSpecificDate.info.push(x);
          } else {
            this.weatherData.push({date: date, info: [x]});
          }
        });

      }

    });
  }

  ngOnInit() {
  }

  getWeatherClass(value: string): string {
    const code = Number(value);
    let cssClassName = 'unknown';
    if (code >= 200 && code < 300) {
      cssClassName = 'thunderstorm';
    } else if (code >= 300 && code < 400) {
      cssClassName = 'scattered-showers';
    } else if (code >= 500 && code < 600) {
      cssClassName = 'rain';
    } else if (code >= 600 && code < 700) {
      cssClassName = 'snow';
    } else if (code === 800) {
      cssClassName = 'sunny';
    } else  if (code > 800 && code < 900) {
      cssClassName = 'cloudy';
    } else if (code === 905) {
      cssClassName = 'wind';
    }
    return cssClassName;
  }

  convertKelvinToFahrenheit(kelvin) {
    kelvin = parseFloat(kelvin);
    return Math.floor(((kelvin - 273.15) * 1.8) + 32);
  }

  sliceTimeFromDateString(date: string) {
    return date.slice(11, 16);
  }

}
