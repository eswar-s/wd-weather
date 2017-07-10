import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ToastComponent } from './toast.component';
import { ToastService } from './toast.service';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  let de: DebugElement;
  let el: HTMLElement;

  let service = new ToastService(null);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToastComponent ],
      providers: [{provide: ToastService, useValue: service }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('.toast-message'));
    el = de.nativeElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display message', () => {
    service.activate('Test Message')
    fixture.detectChanges();
    expect(el.textContent).toContain('Test Message');
  });

  it('should not display different message', () => {
    service.activate('Test Message')
    fixture.detectChanges();
    expect(el.textContent).not.toContain('Sample Message');
  });
});
