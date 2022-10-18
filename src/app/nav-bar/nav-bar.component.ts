import { Component, OnInit } from '@angular/core';
import { ChecksessionService } from '../checksession.service'
import { UsrInfoService } from '../usr-info.service'
import { LogoutService } from '../logout.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { usrInfo } from '../types';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  // Service subscription
  private sus_authService!: Subscription;
  private sus_usrInfoService!: Subscription;
  private sus_checksessionService!: Subscription; 

  // URL
  private URL_Logout: string = "http://localhost:3000/logout"
  private URL_Check: string = "http://localhost:3000/checksession"
  private URL: string = "http://localhost:3000/usrinfo"

  // Local Variables
  opened = false;
  logCheck = false;
  UsrInfo = {} as usrInfo;
  
  logItems = [
    { linkTitle: 'Home',    icon: 'home',  link: '/home'    },
    { linkTitle: 'Compose', icon: 'edit',  link: '/message' },
    { linkTitle: 'Inbox',   icon: 'inbox', link: '/inbox'   },
    { linkTitle: 'Sent',    icon: 'send',  link: '/sent'    }
  ];

  nlogItems = [
    { linkTitle: 'Login',          icon: 'person', link: '/login' },
    { linkTitle: 'Create Account', icon: 'edit',   link: '/registration' }
  ];
  
  constructor(public checksessionService : ChecksessionService,
              public usrInfoService: UsrInfoService,
              public logoutService: LogoutService,
              public authService: AuthService, 
              public router: Router) { }
  

  ngOnInit(): void {

    this.checkLogged ()
    this.onComponent ()

  }

  ngOnDestroy () {
    this.sus_authService.unsubscribe();
    this.sus_checksessionService.unsubscribe();
    this.sus_usrInfoService.unsubscribe();
  }

  // This function enables the navigation bar when a user is logged
  onComponent () {

    this.sus_authService = this.authService.loggedIn$.subscribe((data: boolean) => {
      this.logCheck = data;
      
      if (data) {
        this.loadUser ()
      }
    });

  }

  // This function checks if any user is log in
  checkLogged () {

    this.sus_checksessionService = this.checksessionService.getCall(this.URL_Check).subscribe((data) => {
      this.authService.setUsrData(data);
    });

  }
  
  // This functions brings the user information from the server
  loadUser () {
    
    this.sus_usrInfoService = this.usrInfoService.getCall(this.URL).subscribe(data => {
      this.UsrInfo = data;
    }); 

  }

  // This function destroys the user session in the server
  logOut () {

    this.authService.setUsrData(false);
    this.router.navigateByUrl('/');
    this.logoutService.getCall(this.URL_Logout).subscribe(data => {
    })
  
  }

}
