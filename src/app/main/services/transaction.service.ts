import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account.service';
import { ITransaction } from '../models/Transactions.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private baseUrl = 'http://localhost:3000/transaction';
  selectedTransaction!: ITransaction;
  selectedType$ = new Subject<string>();
  editMode$ = new Subject<boolean>();
  editMode = false;
  selectedTransaction$ = new Subject<ITransaction>();
  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {}
  transactions: ITransaction[] = [];
  transactions$: Subject<ITransaction[]> = new Subject();

  getTransactions(accountId: string) {
    return this.http.get<ITransaction[]>(`${this.baseUrl}/${accountId}`).pipe(
      map((transactions) => {
        this.transactions = transactions;
        this.transactions$.next(this.transactions.slice());
        return transactions;
      })
    );
  }

  getTransaction(accountId: string, id: string) {
    return this.http.get<ITransaction>(`${this.baseUrl}/${accountId}/${id}`);
  }

  createTransaction(transaction: Partial<ITransaction>, accountId: string) {
    return this.http.post<ITransaction>(
      `${this.baseUrl}/${accountId}`,
      transaction
    );
  }

  deleteTransaction(transactionId: string) {
    const accountId = this.accountService.activeAccount._id;
    this.transactions = this.transactions.filter(
      (c) => c._id !== transactionId
    );
    this.transactions$.next(this.transactions.slice());
    return this.http.delete(`${this.baseUrl}/${accountId}/${transactionId}`);
  }

  updateTransaction(transaction: Partial<ITransaction>) {
    const accountId = this.accountService.activeAccount._id;
    return this.http.put(
      `${this.baseUrl}/${accountId}/${this.selectedTransaction._id}`,
      transaction
    );
  }
}
