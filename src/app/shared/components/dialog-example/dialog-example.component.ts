import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { ITransaction } from 'src/app/main/models/Transactions.model';
import { TransactionService } from 'src/app/main/services/transaction.service';
import { SidenavService } from '../../services/sidenav.service';

@Component({
  selector: 'app-dialog-example',
  templateUrl: './dialog-example.component.html',
  styleUrls: ['./dialog-example.component.scss'],
})
export class DialogExampleComponent implements OnInit {
  selectedT!: ITransaction;
  selectedT$!: Subscription;
  constructor(
    private transactionService: TransactionService,
    private snackBar: MatSnackBar,
    private sidenavService: SidenavService
  ) {}

  ngOnInit(): void {
    this.selectedT = this.transactionService.selectedTransaction;
    this.selectedT$ = this.transactionService.selectedTransaction$.subscribe(
      (transaction) => {
        this.selectedT = transaction;
      }
    );
  }

  ngOnDestroy(): void {
    this.selectedT$.unsubscribe();
  }

  onDelete() {
    this.transactionService
      .deleteTransaction(this.selectedT._id)
      .subscribe(() => {
        this.snackBar.open(
          `Transaction: ${this.selectedT.title} was deleted!`,
          'Close',
          { duration: 1000, verticalPosition: 'top' }
        );
        this.sidenavService.closeSideNav();
      });
  }

  
}
