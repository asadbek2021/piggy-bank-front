import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MatNativeDateModule } from '@angular/material/core';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { TransactionCreateComponent } from '../main/transaction/transaction-create/transaction-create.component';
import { MatChipsModule } from '@angular/material/chips';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { TransactionInfoComponent } from '../main/transaction/transaction-info/transaction-info.component';
import { AccountInfoComponent } from '../main/accounts/account-info/account-info.component';
import { AccountCreateComponent } from '../main/accounts/account-create/account-create.component';
import { CategoryCreateComponent } from '../category/category-create/category-create.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogExampleComponent } from './components/dialog-example/dialog-example.component';
import { AccountPopupComponent } from './components/account-popup/account-popup.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    SidenavComponent,
    TransactionCreateComponent,
    TransactionInfoComponent,
    AccountInfoComponent,
    AccountCreateComponent,
    CategoryCreateComponent,
    DialogExampleComponent,
    AccountPopupComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatIconModule,
    MatSnackBarModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatDialogModule,
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatIconModule,
    MatSnackBarModule,
    MatCardModule,
    MatProgressSpinnerModule,
    SpinnerComponent,
    MatNativeDateModule,
    MatDatepickerModule,
    SidenavComponent,
    MatChipsModule,
    MatSelectModule,
    AccountInfoComponent,
    AccountCreateComponent,
    CategoryCreateComponent,
    MatAutocompleteModule,
    MatMenuModule,
    MatDialogModule,
    DialogExampleComponent,
  ],
})
export class SharedModule {}
