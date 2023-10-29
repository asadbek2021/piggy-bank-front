import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})

export class AuthFormComponent implements OnInit {
  loginForm:FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.spinnerService.hideSpinner();
    localStorage.clear();
  }

  constructor(
    private authService:AuthService,
    private router:Router,
    private snackBar: MatSnackBar,
    private spinnerService:SpinnerService
    ) { }

  onSubmit():void {
   const { email, password } = this.loginForm.value;
   this.authService.login(email, password).subscribe((data)=>{
     const response = data as {token:string, expiresIn:string};
      if(response.token){
        this.router.navigateByUrl('/main');
        this.openSnack('Successful login!', 'close',{duration:1000});
      }

   }, (error)=>{  const errore = error as Error;
    this.openSnack(errore.message, 'close',{});});
  }

  openSnack(message:string, action:string, options: MatSnackBarConfig):void{
    this.snackBar.open(message,action,{verticalPosition:'top', horizontalPosition:'right',...options})
  }


}
