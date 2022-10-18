import { Component, OnInit } from '@angular/core';
import { UserData, Country } from './types'
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  // URL 
  private URL_Countries: string = "http://localhost:3000/registration/countries"
  private URL_Cities: string = "http://localhost:3000/registration/cities/"
  private URL_Data: string = "http://localhost:3000/registration"

  // Local Variables
  public countries = new Array<Country>();
  public cities: string[] = []; 
  public countryID = null;
  flagRegistration = false;
  flagCities = false;
  userData = {} as UserData;

  // Service subscription
  private RegistrationHttpService!: Subscription; 
  private CountriesHttpService!: Subscription; 
  private CitiesHttpService!: Subscription; 

  constructor(public httpService: HttpService,
              private snackBar: MatSnackBar,
              public router: Router) { }

  ngOnInit() {
    this.loadCountries ();
  }

  ngOnDestroy () {
    this.CountriesHttpService.unsubscribe();
    if (this.flagCities) {
      this.CitiesHttpService.unsubscribe();
    }
    if (this.flagRegistration) {
      this.RegistrationHttpService.unsubscribe();
    }
  }

  // Obtain list of cities and countries from Backend
  loadCountries() {
    this.CountriesHttpService = this.httpService.getCall(this.URL_Countries).subscribe((data) => {
      this.countries = data;
    })  

  }

  changeCountry(countryID: number) {

    if (countryID) {
      this.CitiesHttpService = this.httpService.getCall(this.URL_Cities + countryID).subscribe((data) =>{
        this.cities = data;
        this.flagCities = true;
      })
    } else {
      this.cities = [];
    }
  }
  
  // This function sends the user registration data to the server
  sentForm(Form :NgForm) {  

    // Check if the password and confirm password matches
    if(this.userData.password === this.userData.CPassword) {
   
      this.RegistrationHttpService = this.httpService.postCall(this.URL_Data, this.userData).subscribe((data: boolean) => {
        this.flagRegistration = true;

        // Check if the user exists...
        if (data) {
          this.router.navigateByUrl('/registered');
          
        } else {
          this.snackBar.open('User already exists', 'CLOSE', {
            horizontalPosition: 'center', 
            verticalPosition: 'top', 
            panelClass: 'red-snackbar'});

            Form.reset();
       }
      });

    } else {

      this.snackBar.open('Passwords do not match', 'CLOSE', {
        horizontalPosition: 'center', 
        verticalPosition: 'top', 
        panelClass: 'red-snackbar'});

        this.router.navigateByUrl('/registration');
    }
  }

}
