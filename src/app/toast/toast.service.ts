import { Injectable, Optional, SkipSelf } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

export interface ToastMessage {
  message: string;
}

@Injectable()
export class ToastService {
  private toastSubject = new Subject<ToastMessage>();

  toastState: Observable<ToastMessage> = this.toastSubject.asObservable();

  constructor(@Optional() @SkipSelf() prior: ToastService) {
    if (prior) {
      return prior;
    }
  }

  activate(message?: string) {
    this.toastSubject.next(<ToastMessage>{ message: message });
  }
}
