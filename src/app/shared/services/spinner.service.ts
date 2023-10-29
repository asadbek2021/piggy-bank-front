import { Injectable } from '@angular/core';
import { asyncScheduler, BehaviorSubject, Subject } from 'rxjs';
import { observeOn } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class SpinnerService {

  private isSpinnerVisible$:Subject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {}

  getIsSpinnerVisible$ () {
   return this.isSpinnerVisible$.asObservable().pipe(
      observeOn(asyncScheduler)
    )
  }

  showSpinner():void{
   this.isSpinnerVisible$.next(true);
  }

  hideSpinner():void{
   this.isSpinnerVisible$.next(false);
  }

}
