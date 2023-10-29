import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { IAccounts } from 'src/app/main/models/Accounts';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-account-popup',
  templateUrl: './account-popup.component.html',
  styleUrls: ['./account-popup.component.scss'],
})
export class AccountPopupComponent implements OnInit, OnDestroy {
  activeAccount!: IAccounts;
  activeAccountSubs!: Subscription;
  constructor(
    private accountService: AccountService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.activeAccount = this.accountService.activeAccount;
    this.activeAccountSubs = this.accountService.activeAccount$.subscribe(
      (account) => {
        this.activeAccount = account;
      }
    );
  }

  ngOnDestroy() {
    this.activeAccountSubs.unsubscribe();
  }

  onDelete() {
    this.accountService.deteleAccount(this.activeAccount._id).subscribe(() => {
      this.snackBar.open(
        `Account: ${this.activeAccount.title} was successfully removed!`,
        'Close',
        { duration: 1000, verticalPosition: 'top' }
      );
      this.accountService.getAccounts().subscribe((accounts) => {
        this.accountService.accounts$.next(accounts);
      });
    });
  }
}
