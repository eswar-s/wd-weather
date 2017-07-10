import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { APP_BASE_HREF } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { JsonpModule } from '@angular/http';
import { AppRoutingModule } from '../app.routing';

import { weathers } from '../weather.store';

import { OpenWeatherComponent } from './open-weather.component';

describe('OpenWeatherComponent', () => {
  let component: OpenWeatherComponent;
  let fixture: ComponentFixture<OpenWeatherComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        JsonpModule,
        StoreModule.provideStore({ weathers: weathers }),
        AppRoutingModule,
      ],
      providers: [{provide: APP_BASE_HREF, useValue : '/' }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('.city-name'));
    el = de.nativeElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

});
