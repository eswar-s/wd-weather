import { Component, OnDestroy, OnInit, ElementRef } from '@angular/core';
import { ToastService } from './toast.service';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'wd-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit, OnDestroy {

  private defaults = {
    title: '',
    message: 'Unknown error'
  };
  private toastElement: any;
  private toastSubscription: Subscription;

  title: string;
  message: string;

  constructor(private toastService: ToastService, private elementRef: ElementRef) {
    this.toastSubscription = this.toastService.toastState.subscribe((toastMessage) => {
      this.activate(toastMessage.message);
    });

    this.elementRef.nativeElement.style.display = 'none';
  }

  activate(message = this.defaults.message, title = this.defaults.title) {
    this.title = title;
    this.message = message;
    this.show();
  }

  ngOnInit() {
    this.toastElement = document.getElementById('toast');
  }

  ngOnDestroy() {
    this.toastSubscription.unsubscribe();
  }

  private show() {
    this.toastElement.style.opacity = 1;
    this.toastElement.style.zIndex = 9999;
    this.elementRef.nativeElement.style.display = 'block';

    window.setTimeout(() => this.hide(), 5000);
  }

  private hide() {
    this.toastElement.style.opacity = 0;
    window.setTimeout(() => this.toastElement.style.zIndex = 0, 400);
    this.elementRef.nativeElement.style.display = 'none';
  }

}
