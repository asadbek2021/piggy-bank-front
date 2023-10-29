import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { IAccounts } from '../main/models/Accounts';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private baseUrl = 'http://localhost:3000';
  activeAccount!: IAccounts;
  editMode = false;
  editMode$ = new Subject<boolean>();
  activeAccount$ = new Subject<IAccounts>();
  accounts$ = new Subject<IAccounts[]>();
  constructor(private http: HttpClient) {}

  getAccounts() {
    return this.http.get<IAccounts[]>(`${this.baseUrl}/account`).pipe(
      tap((accounts) => {
        this.activeAccount = accounts[0];
        this.activeAccount$.next(this.activeAccount);
      })
    );
  }

  getCurrencies() {
    return this.http.get(`${this.baseUrl}/currency`).pipe(
      map((values: any) => {
        return values.map((c: { code: string; symbol: string }) => {
          return { code: c.code, sign: c.symbol };
        });
      })
    );
  }

  addAccount(account: Partial<IAccounts>) {
    return this.http.post<IAccounts>(`${this.baseUrl}/account/`, account).pipe(
      tap((account) => {
        this.getAccounts().subscribe((accs) => {
          this.accounts$.next(accs);
        });
      })
    );
  }

  deteleAccount(accountId: string) {
    return this.http.delete(`${this.baseUrl}/account/${accountId}`);
  }

  updateAccount(id: string, body: Partial<IAccounts>) {
    return this.http.put<IAccounts>(`${this.baseUrl}/account/${id}`, body).pipe(
      tap((account) => {
        this.getAccounts().subscribe((accs) => {
          this.accounts$.next(accs);
        });
      })
    );
  }
}
