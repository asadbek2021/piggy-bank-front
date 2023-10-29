import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent, MenuComponent],
  imports: [CommonModule, SharedModule, RouterModule],
  exports: [HeaderComponent, MenuComponent],
})
export class LayoutModule {}