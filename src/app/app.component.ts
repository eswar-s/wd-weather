import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { WeatherService } from './weather.service';
import { ToastService } from './toast/toast.service';

@Component({
  selector: 'wd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  weathers: Observable<Array<any>>;
  showCityForm: boolean;
  isFormValidating: boolean;
  cityNameModel: string;
  activateCancelButton: boolean;


  constructor(private weatherService: WeatherService, private toastService: ToastService,
    private router: Router ) {
    this.weathers = weatherService.weathers;
    this.showCityForm = false;
    this.isFormValidating = false;
    this.cityNameModel = '';
    this.activateCancelButton = false;
  }

  ngOnInit() {
    this.router.events
    .filter(event => event instanceof NavigationEnd)
    .subscribe((event: NavigationEnd) => {
      if (event.url === '/') {
        this.activateCancelButton = false;
      } else {
        this.activateCancelButton = true;
      }
    });
  }

  reloadPage() {
    location.reload();
  }

  toggleCityForm() {
    if (this.activateCancelButton) {
      this.router.navigate(['/']);
    } else {
      this.showCityForm = !this.showCityForm;
      this.isFormValidating = false;
      this.cityNameModel = '';
    }
  }

  validateForm() {
    this.isFormValidating = true;
    this.weatherService.getWeatherByCity(this.cityNameModel).subscribe(data => {
      if (data['_body'] && data['_body']['query'] && data['_body']['query']['count'] === 1) {
        this.weatherService.addWeatherToStore(data['_body']['query']['results']['channel']);
        this.toggleCityForm();
      } else {
        this.toastService.activate('Entered city weather is not found, please try another');
        this.isFormValidating = false;
      }
    });
  }

}
