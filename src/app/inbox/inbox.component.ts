import { Component, OnInit } from '@angular/core';
import { UsrInfoService } from '../usr-info.service'
import { Subscription } from 'rxjs';
import { HttpService } from '../http.service';
import { AuthService } from '../auth.service';
import { MessData } from './types';
import { usrInfo } from '../types';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  // URL
  private URL_Up: string = "http://localhost:3000/inbox/"
  private URL_De: string = "http://localhost:3000/inbox/delete/"
  private URL_Re: string = "http://localhost:3000/inbox/markasread/"

  // From Backend
  public messData = new Array<MessData>(); 

  // Arrays for filtering
  public messDataToView = new Array<MessData>(); 
  public messDataFiltered = new Array<MessData>(); 

  // Subscription service
  private sus_authService!: Subscription;
  private sus_usrInfoServiceLoad!: Subscription;
  private sus_usrInfoServiceRead!: Subscription;
  private sus_usrInfoServiceDelete!: Subscription;
  
  // Local variables
  textFiltered = '';
  UsrInfo = {} as usrInfo;
  flagDelete = false;
  flagRead = false;

  constructor(public httpService: HttpService,
              public authService: AuthService,
              public usrInfoService: UsrInfoService) { }

  ngOnInit(): void {

    this.updateInbox();

  }

  ngOnDestroy () {

    this.sus_authService.unsubscribe();
    this.sus_usrInfoServiceLoad.unsubscribe();

    if (this.flagDelete) {
      this.sus_usrInfoServiceDelete.unsubscribe();
    }
    if (this.flagRead) {
      this.sus_usrInfoServiceRead.unsubscribe();
    }
  }

  // This function bring the messages to the inbox
  updateInbox () { 

    this.sus_authService = this.authService.loggedIn$.subscribe((data: boolean) => {

      if (data) {
        this.sus_usrInfoServiceLoad = this.httpService.getCall(this.URL_Up).subscribe((data) => {this.messData = data.reverse()
        this.messDataToView = this.messData;});
      }
    });

  }

  // This function filters the messages by name or username of the recipients
  messFilter () { 

    this.messDataFiltered = this.messData.filter((mess) => mess.from.toLowerCase().includes(this.textFiltered.trim().toLowerCase()))
    this.messDataToView = this.messDataFiltered;

  }

  // This function clears the filter
  cleanFilter () {

    this.messDataToView = this.messData;
    this.textFiltered = '';

  }

  // This function marks as read or unread a message
  markAsread(id: number) {

    this.sus_usrInfoServiceRead = this.httpService.getCall(this.URL_Re + id).subscribe((data) => {this.messData = data.reverse()
    this.messDataToView = this.messData;
    this.flagRead = true;});

  }

  // This function is used to delete a message
  onDelete (id: number) {

    this.sus_usrInfoServiceDelete = this.httpService.getCall(this.URL_De + id).subscribe((data) => {this.messData = data.reverse()
      this.messDataToView = this.messData;
    });
    this.flagDelete = true;

  }


}
