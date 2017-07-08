import { Injectable } from '@angular/core';
import { Jsonp, RequestOptions, Response, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import 'rxjs/add/operator/map';

import { AppStore } from './models/app.store.model';

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
      savedLocations = ['Chennai', 'Bengaluru'];
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
      let filteredLocations = savedLocations.filter((item: any) => data.location.city !== item);
      localStorage.setItem('saved_locations', JSON.stringify(filteredLocations));
    }
    this.store.dispatch({ type: 'DELETE_WEATHER', payload: data});
  }

  public getWeatherByCity(name: string): Observable<Response> {
    let apiURL = 'https://query.yahooapis.com/v1/public/yql';

    let params = new URLSearchParams();
    params.set('q', `select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${name}")`);
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');

    return this.jsonp.get(apiURL, { search: params });
  }
}
