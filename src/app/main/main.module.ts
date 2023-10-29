import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main-page/main.component';
import { AuthGuard } from '../auth/auth.guard';
import { TransactionComponent } from './transaction/transaction.component';
import { SharedModule } from '../shared/shared.module';
import { MainActionComponent } from './main-action/main-action.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { AccountsComponent } from './accounts/accounts.component';
import { TransactionService } from './services/transaction.service';
import { CategoryComponent } from '../category/category.component';
import { StatisticComponent } from '../statistic/statistic.component';
import { ObligatoryComponent } from '../obligatory/obligatory.component';
import { AdminComponent } from '../admin/admin.component';
import { SubscriptionComponent } from '../subscription/subscription.component';
import { TransactionSelectPipe } from '../pipes/transaction-select.pipe';
import { SearchPipe } from '../pipes/search.pipe';
import { SortByPipe } from '../pipes/sort-by.pipe';

const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'category',
    component: CategoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'statistic',
    component: StatisticComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'obligatory',
    component: ObligatoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'subscription',
    component: SubscriptionComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    MainComponent,
    TransactionComponent,
    MainActionComponent,
    SearchComponent,
    AccountsComponent,
    TransactionSelectPipe,
    SearchPipe,
    SortByPipe,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [SearchComponent],
  providers: [TransactionService],
})
export class MainModule {}
