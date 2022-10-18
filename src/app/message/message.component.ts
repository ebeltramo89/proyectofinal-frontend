import { UserList, MessData } from './types'
import { Component, OnInit } from '@angular/core';
import { UsrInfoService } from '../usr-info.service'
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { HttpService } from '../http.service';
import { usrInfo } from '../types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  // URL
  private URL_List: string = "http://localhost:3000/message/userlist"
  private URL_Send: string = "http://localhost:3000/message/send"
  private URL: string = "http://localhost:3000/usrinfo"

  // Local variables
  flagUserInfo = false;
  flagsendMess = false;

  // From Backend
  public usersList = new Array<UserList>(); 

  // Subscription service
  private userListHttpService!: Subscription;
  private userInfoHttpService!: Subscription;
  private sendMessHttpService!: Subscription;
  private sus_authService!: Subscription;

  // To Backend
  public messInfo = {subject: '', message: ''};
  public messData = {} as MessData; 

  UsrInfo = {} as usrInfo;

  constructor(public usrInfoService: UsrInfoService,
              public httpService: HttpService,
              public authService: AuthService,
              private snackBar: MatSnackBar,
              public router: Router) { }

  ngOnInit(): void {

    this.loadUserInfo ();
    this.loadUsers();

  }

  ngOnDestroy () {

    this.userListHttpService.unsubscribe();
    this.sus_authService.unsubscribe();
    if (this.flagUserInfo) {
      this.userInfoHttpService.unsubscribe();
    }
    if (this.flagsendMess) {
      this.sendMessHttpService.unsubscribe();
    }

  }

  // Obtain users list from back
  loadUsers () {

    this.userListHttpService = this.httpService.getCall(this.URL_List).subscribe((data) => this.usersList = data)
  
  }

  // This function brings the user information: id, name, surname, username
  loadUserInfo () {

    this.sus_authService = this.authService.loggedIn$.subscribe((data: boolean) => {

      if (data) {
        this.userInfoHttpService = this.usrInfoService.getCall(this.URL).subscribe(data => {this.UsrInfo = data;});
        this.flagUserInfo = true;
      }
    }); 

  }
  
  usersSelected = new FormControl('');
  
  // This function send message data to the server
  onSubmit () {

    this.messData = {recip: this.usersSelected.value, sender: this.UsrInfo, 
                     subj: this.messInfo.subject, mess: this.messInfo.message}
                 
    this.sendMessHttpService = this.httpService.postCall(this.URL_Send, this.messData).subscribe((data: boolean) => {

      this.flagsendMess = true;

      if (data) {
        this.snackBar.open('Message sent', 'CLOSE', {
          horizontalPosition: 'center', 
          verticalPosition: 'top', 
          panelClass: 'red-snackbar'});
        this.router.navigateByUrl('/inbox');
      }
    })
  }


}
