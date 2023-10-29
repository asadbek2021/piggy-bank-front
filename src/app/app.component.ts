import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { Router } from '@angular/router';
import { SpinnerService } from './shared/services/spinner.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  isSpinnerVisible:boolean = false;
  authSubs!:Subscription;
  constructor(
    private authService: AuthService,
    private router: Router,
    private spinnerService: SpinnerService
    ) { }

  ngOnInit(): void {
    this.spinnerService.getIsSpinnerVisible$().subscribe((value:boolean)=>{
      this.isSpinnerVisible = value;
    })
    this.authSubs = this.authService.isLoggedIn$.subscribe(isLogged=>{
      if(!isLogged){
        this.router.navigate(['/login']);
      }
    })
  }

  get isLoggedIn():boolean {
    return this.authService.isLoggedIn();
  }

  logout():void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }




}
