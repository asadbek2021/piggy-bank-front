import { Component } from '@angular/core';
import { SidenavService } from 'src/app/shared/services/sidenav.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  constructor(private sidenavService:SidenavService) {}

  ngOnInit(): void {
   this.sidenavService.sidenavContent$.next('main');
  }
}
