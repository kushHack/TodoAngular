import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  inputPopUp = new Subject<boolean>();
  isUpdating = new Subject<{ status: boolean; id?: string }>();
  constructor() {}

  setPopUp(status: boolean) {
    this.inputPopUp.next(status);
  }
  setIsUpdating(update: { status: boolean; id?: string }) {
    this.isUpdating.next({ ...update });
  }
}
