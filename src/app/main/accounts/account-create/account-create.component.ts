import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from 'src/app/services/account.service';
import { SidenavService } from 'src/app/shared/services/sidenav.service';
import { IAccounts } from '../../models/Accounts';

@Component({
  selector: 'app-account-create',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.scss'],
})
export class AccountCreateComponent implements OnInit {
  editMode = false;
  addAccountForm!: FormGroup;
  currencies!: { code: string; sign: string }[];
  constructor(
    private sidenavService: SidenavService,
    private accountService: AccountService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.accountService.getCurrencies().subscribe((curr) => {
      this.currencies = curr;
    });
    this.addAccountForm = new FormGroup({
      title: new FormControl('', Validators.required),
      currency: new FormControl('USD', Validators.required),
      description: new FormControl(''),
      balance: new FormControl(0, Validators.required),
    });
    this.editMode = this.accountService.editMode;

    if (this.editMode) {
      this.addAccountForm
        .get('title')
        ?.setValue(this.accountService.activeAccount.title);
      this.addAccountForm
        .get('currency')
        ?.setValue(this.accountService.activeAccount.currency);
      this.addAccountForm
        .get('description')
        ?.setValue(this.accountService.activeAccount.description);
      this.addAccountForm
        .get('balance')
        ?.setValue(this.accountService.activeAccount.balance);
    }
  }

  onClose() {
    this.sidenavService.closeSideNav();
  }

  onCancel() {
    this.onClose();
    this.addAccountForm.reset();
  }

  onSubmit() {
    if (!this.editMode) {
      this.accountService
        .addAccount(this.addAccountForm.value)
        .subscribe((account: IAccounts) => {
          this.snackBar.open(
            `The account ${account.title} was successfully created`,
            'Close',
            { verticalPosition: 'top', politeness: 'polite', duration: 1000 }
          );
          this.onClose();
        });
      return;
    }

    this.accountService
      .updateAccount(
        this.accountService.activeAccount._id,
        this.addAccountForm.value
      )
      .subscribe((account) => {
        this.snackBar.open(
          `The account ${account.title} was successfully updated`,
          'Close',
          { verticalPosition: 'top', politeness: 'polite', duration: 1000 }
        );
        this.onClose();
      });
  }
}
