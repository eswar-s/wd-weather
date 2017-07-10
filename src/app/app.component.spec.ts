import { TestBed, async } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { ToastComponent } from './toast/toast.component';
import { WeatherService } from './weather.service';
import { ToastService } from './toast/toast.service';
import { weathers } from './weather.store';

import { AppRoutingModule } from './app.routing';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        JsonpModule,
        FormsModule,
        AppRoutingModule,
        StoreModule.provideStore({ weathers: weathers })
      ],
      declarations: [
        AppComponent,
        ToastComponent
      ],
      providers: [{provide: APP_BASE_HREF, useValue : '/' }]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
