import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { APP_BASE_HREF } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { JsonpModule } from '@angular/http';
import { AppRoutingModule } from '../app.routing';

import { weathers } from '../weather.store';

import { WeatherCityListComponent } from './weather-city-list.component';

describe('WeatherCityListComponent', () => {
  let component: WeatherCityListComponent;
  let fixture: ComponentFixture<WeatherCityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        JsonpModule,
        StoreModule.provideStore({ weathers: weathers }),
        AppRoutingModule
      ],
      providers: [{provide: APP_BASE_HREF, useValue : '/' }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherCityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
