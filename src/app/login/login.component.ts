import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpService } from '../http.service';
import { AuthService } from '../auth.service';
import { userLogin } from './types';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms'
 


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  // URL
  private URL: string = "http://localhost:3000/login"

  // To Backend
  public UserLogin = {} as userLogin; 

  // Subscription
  private subscription!: Subscription;

  // Local variable
  flagSubscription = false;


  constructor(public httpService: HttpService, 
              public authService: AuthService, 
              public router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {

  }

  ngOnDestroy () {
    if (this.flagSubscription) {
      this.subscription.unsubscribe();
    }
  }

  // This function allows the log in of the user
  logIn(Form :NgForm) {

    this.subscription = this.httpService.postCall(this.URL, this.UserLogin).subscribe((data: boolean) => {
      this.flagSubscription = true;
    console.log(data)
      if(data) {
        this.authService.setUsrData(true);
        this.router.navigateByUrl('/');
        
      } else if (!data) {
        this.snackBar.open('Invalid User or Password', 'CLOSE', {
           horizontalPosition: 'center', 
           verticalPosition: 'top', 
           panelClass: 'red-snackbar'});
      }
      Form.reset();
    })
  }

}
