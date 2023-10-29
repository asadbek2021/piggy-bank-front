import { Component } from '@angular/core';
import { SidenavService } from 'src/app/shared/services/sidenav.service';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-main-action',
  templateUrl: './main-action.component.html',
  styleUrls: ['./main-action.component.scss'],
})
export class MainActionComponent {
  transactionSort!: string;
  constructor(
    private transactionService: TransactionService,
    private sidenavService: SidenavService
  ) {}

  onSelect(type: string) {
    if (type == this.transactionSort) {
      this.transactionService.selectedType$.next('');
      return;
    }
    this.transactionSort = type;
    this.transactionService.selectedType$.next(type);
  }

  onAddTransaction() {
    this.transactionService.editMode = false;
    this.transactionService.editMode$.next(false);
    this.sidenavService.sidenavContent$.next('main');
    this.sidenavService.openSideNav();
  }

  onAddCategory() {
    this.sidenavService.sidenavContent$.next('category');
    this.sidenavService.openSideNav();
  }

  onAddAccount() {
    this.sidenavService.sidenavContent$.next('account-create');
    this.sidenavService.openSideNav();
  }
}
