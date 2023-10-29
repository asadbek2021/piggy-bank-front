import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { AccountPopupComponent } from 'src/app/shared/components/account-popup/account-popup.component';
import { SidenavService } from 'src/app/shared/services/sidenav.service';
import { IAccounts } from '../../models/Accounts';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss'],
})
export class AccountInfoComponent implements OnInit, OnDestroy {
  account!: IAccounts;
  accountSubs!: Subscription;
  constructor(
    private accountService: AccountService,
    private sidenavService: SidenavService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.account = this.accountService.activeAccount;
    this.accountSubs = this.accountService.activeAccount$.subscribe(
      (account) => {
        this.account = account;
      }
    );
  }

  ngOnDestroy(): void {
    this.accountSubs.unsubscribe();
  }

  onEdit() {
    this.accountService.editMode = true;
    this.accountService.editMode$.next(true);
    this.sidenavService.sidenavContent$.next('account-create');
  }

  onDelete() {
    this.matDialog.open(AccountPopupComponent);
  }

  onClose() {
    this.sidenavService.closeSideNav();
  }
}
