import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { MainModule } from './main/main.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from './layout/layout.module';
import { CategoryComponent } from './category/category.component';
import { StatisticComponent } from './statistic/statistic.component';
import { ObligatoryComponent } from './obligatory/obligatory.component';
import { AdminComponent } from './admin/admin.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { MycurrencyPipe } from './pipes/mycurrency.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    CategoryComponent,
    StatisticComponent,
    ObligatoryComponent,
    AdminComponent,
    SubscriptionComponent,
    MycurrencyPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AuthModule,
    MainModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    LayoutModule,
    SharedModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
