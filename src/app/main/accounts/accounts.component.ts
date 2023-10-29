import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { SidenavService } from 'src/app/shared/services/sidenav.service';
import { IAccounts } from '../models/Accounts';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent implements OnInit, OnDestroy {
  accounts: IAccounts[] = [];
  accountsSub!: Subscription;
  activeAccount!: IAccounts;
  constructor(
    private accountService: AccountService,
    private sidenavService: SidenavService
  ) {}

  ngOnInit(): void {
    this.accountService.getAccounts().subscribe((data) => {
      this.accounts = data;
      this.activeAccount = this.accounts[0];
    });
    this.accountsSub = this.accountService.accounts$.subscribe((data) => {
      this.accounts = data;
    });
  }

  ngOnDestroy(): void {
    this.accountsSub.unsubscribe();
  }

  onSwitchAccount(account: IAccounts) {
    if (account._id === this.activeAccount._id) {
      this.onDetail();
      return;
    }
    this.accountService.activeAccount$.next(account);
    this.accountService.activeAccount = account;
    this.activeAccount = account;
  }

  onDetail() {
    this.sidenavService.sidenavContent$.next('account-info');
    this.sidenavService.openSideNav();
  }
}
