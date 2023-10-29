import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { DialogExampleComponent } from 'src/app/shared/components/dialog-example/dialog-example.component';
import { SidenavService } from 'src/app/shared/services/sidenav.service';
import { IAccounts } from '../../models/Accounts';
import { ITransaction } from '../../models/Transactions.model';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-transaction-info',
  templateUrl: './transaction-info.component.html',
  styleUrls: ['./transaction-info.component.scss'],
})
export class TransactionInfoComponent implements OnInit, OnDestroy {
  transaction!: ITransaction;
  transactionSubs!: Subscription;
  currentAccount!: IAccounts;
  currentAccountSubs!: Subscription;
  constructor(
    private transactionService: TransactionService,
    private sidenavService: SidenavService,
    private matDialog: MatDialog,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.transaction = this.transactionService.selectedTransaction;
    this.transactionSubs =
      this.transactionService.selectedTransaction$.subscribe((transaction) => {
        this.transaction = transaction;
      });
    this.currentAccount = this.accountService.activeAccount;
    this.currentAccountSubs = this.accountService.activeAccount$.subscribe(
      (account) => {
        this.currentAccount = account;
      }
    );
  }

  ngOnDestroy(): void {
    this.transactionSubs.unsubscribe();
    this.currentAccountSubs.unsubscribe();
  }

  onEdit() {
    this.transactionService.editMode$.next(true);
    this.transactionService.editMode = true;
    this.sidenavService.sidenavContent$.next('main');
  }

  onDelete() {
    this.matDialog.open(DialogExampleComponent);
  }

  onClose() {
    this.sidenavService.closeSideNav();
  }
}
