import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { SidenavService } from 'src/app/shared/services/sidenav.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { IAccounts } from '../models/Accounts';
import { ITransaction } from '../models/Transactions.model';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit, OnDestroy {
  accountSubs!: Subscription;
  account!: IAccounts;
  transactions?: Array<ITransaction>;
  transactionSubs?: Subscription;
  transactionSelType!: string;
  transactionSelTypeSubs!: Subscription;
  transactionUpdate!: Subscription;
  searchValue!: string;
  currency!: string;
  switchSortByDate: boolean = false;
  constructor(
    private transactionService: TransactionService,
    private spinnerService: SpinnerService,
    private accountService: AccountService,
    private sidenavService: SidenavService
  ) {}

  ngOnInit(): void {
    this.accountSubs = this.accountService.activeAccount$.subscribe(
      (account) => {
        this.account = account;
        this.currency = account.currency;
        if(!account){
          return;
        }
        this.spinnerService.showSpinner();
        this.transactionSubs = this.transactionService
          .getTransactions(account._id)
          .subscribe((value: ITransaction[]) => {
            this.transactions = value;
            this.spinnerService.hideSpinner();
          });
      }
    );
    this.transactionSelTypeSubs =
      this.transactionService.selectedType$.subscribe((type) => {
        this.transactionSelType = type;
      });
    this.transactionUpdate = this.transactionService.transactions$.subscribe(
      (transactions) => {
        this.transactions = transactions;
      }
    );
  }

  ngOnDestroy(): void {
    this.accountSubs.unsubscribe();
    this.transactionSubs?.unsubscribe();
    this.transactionSelTypeSubs.unsubscribe();
  }

  onSearch(value: string) {
    this.searchValue = value;
  }

  onSelect(transaction: ITransaction) {
    this.transactionService.selectedTransaction$.next(transaction);
    this.transactionService.selectedTransaction = transaction;
    this.sidenavService.sidenavContent$.next('transaction-info');
    this.sidenavService.openSideNav();
  }
}
