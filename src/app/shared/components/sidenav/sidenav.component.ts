import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { SidenavService } from '../../services/sidenav.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit, OnDestroy {
  isOpen = false;
  sidenavContent!: string;
  sidenavContentSubs!: Subscription;
  constructor(private sidenavService: SidenavService) {}
  ngOnInit(): void {
    this.sidenavContentSubs = this.sidenavService.sidenavContent$.subscribe(
      (value) => {
        this.sidenavContent = value;
      }
    );
    this.sidenavService.isShown$.subscribe((value) => {
      this.isOpen = value;
    });
  }

  ngOnDestroy(): void {
    this.sidenavContentSubs.unsubscribe();
  }

  onClose() {
    this.sidenavService.closeSideNav();
  }
}
