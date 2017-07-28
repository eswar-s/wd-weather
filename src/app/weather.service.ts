import { Injectable } from '@angular/core';
import { Jsonp, RequestOptions, Response, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import 'rxjs/add/operator/map';

import { AppStore } from './models/app.store.model';

import { environment } from '../environments/environment';

@Injectable()
export class WeatherService {

  weathers: Observable<Array<any>>;

  constructor(private store: Store<AppStore>, private jsonp: Jsonp) {
    this.weathers = store.select('weathers');

    let savedLocations: string[];
    const storedSavedLocations = localStorage.getItem('saved_locations');

    if (storedSavedLocations) {
      savedLocations = JSON.parse(storedSavedLocations);
    } else {
      savedLocations = ['Bengaluru', 'New York'];
      localStorage.setItem('saved_locations', JSON.stringify(savedLocations));
    }

    for (const location of savedLocations) {
      this.getWeatherByCity(location).subscribe(data => {
        if (data['_body'] && data['_body']['query'] && data['_body']['query']['count'] === 1) {
          this.store.dispatch({ type: 'CREATE_WEATHER', payload: data['_body']['query']['results']['channel'] });
        }
      });
    }
  }

  public addWeatherToStore(data: any) {
    let savedLocations: string[];
    const storedSavedLocations = localStorage.getItem('saved_locations');
    if (storedSavedLocations) {
      savedLocations = JSON.parse(storedSavedLocations);
      if (savedLocations.indexOf(data.location.city) < 0) {
        savedLocations.push(data.location.city);
      }
    } else {
      savedLocations = [data.location.city];
    }

    this.store.dispatch({ type: 'CREATE_WEATHER', payload: data});
    localStorage.setItem('saved_locations', JSON.stringify(savedLocations));
  }

  public deleteWeatherInStore(data: any) {
    let savedLocations: string[];
    const storedSavedLocations = localStorage.getItem('saved_locations');
    if (storedSavedLocations) {
      savedLocations = JSON.parse(storedSavedLocations);
      const filteredLocations = savedLocations.filter((item: any) => data.location.city !== item);
      localStorage.setItem('saved_locations', JSON.stringify(filteredLocations));
    }
    this.store.dispatch({ type: 'DELETE_WEATHER', payload: data});
  }

  public getWeatherByCity(name: string): Observable<Response> {
    const apiURL = 'https://query.yahooapis.com/v1/public/yql';

    const params = new URLSearchParams();
    params.set('q', `select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${name}")`);
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');

    return this.jsonp.get(apiURL, { search: params });
  }

  public getOpenWeather(city: string): Observable<Response> {
    const apiURL = environment.openWeatherAPI;

    const params = new URLSearchParams();
    params.set('id', city);
    params.set('APPID', '2858d62c90078157cddb84347d8430a2');
    params.set('callback', 'JSONP_CALLBACK');

    return this.jsonp.get(apiURL, { search: params });
  }

  getWeatherClass(value: string): string {
    const code = Number(value);
    let cssClassName = 'unknown';
    if (code === 3 || code === 4 || code === 37 || code === 38 || code === 39 || code === 47) {
      cssClassName = 'thunderstorm';
    } else if (code >= 5 && code <= 12 || code === 40 || code === 45) {
      cssClassName = 'rain';
    } else if (code >= 13 && code <= 16 || code === 41 || code === 42 || code === 43) {
      cssClassName = 'snow';
    } else if (code === 18) {
      cssClassName = 'sleet';
    } else if (code === 20) {
      cssClassName = 'fog';
    } else if (code === 24) {
      cssClassName = 'wind';
    } else if (code === 25) {
      cssClassName = 'cold';
    } else if (code >= 26 && code <= 29 || code === 44) {
      cssClassName = 'cloudy';
    } else if (code === 30) {
      cssClassName = 'partly-cloudy';
    } else if (code === 32 || code === 36) {
      cssClassName = 'sunny';
    } else if (code === 40) {
      cssClassName = 'scattered-showers';
    }
    return cssClassName;
  }
}
