import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  isShown$ = new Subject<boolean>();
  sidenavContent$ = new Subject<string>();
  constructor() { }

  openSideNav(){
   this.isShown$.next(true);
  }
  closeSideNav(){
   this.isShown$.next(false);
  }
}
