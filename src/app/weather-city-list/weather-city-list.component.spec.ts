import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherCityListComponent } from './weather-city-list.component';

describe('WeatherCityListComponent', () => {
  let component: WeatherCityListComponent;
  let fixture: ComponentFixture<WeatherCityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherCityListComponent ]
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
