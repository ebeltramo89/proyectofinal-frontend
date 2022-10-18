import { Component, OnInit } from '@angular/core';
import { UsrInfoService } from '../usr-info.service'
import { Subscription } from 'rxjs';
import { HttpService } from '../http.service';
import { AuthService } from '../auth.service';
import { usrInfo } from '../types';
import { MessData } from './types';

@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.css']
})
export class SentComponent implements OnInit {

  // URL
  private URL_Up: string = "http://localhost:3000/sent/"
  private URL_De: string = "http://localhost:3000/sent/delete/"

  // Local variables
  // Arrays for filtering
  public messDataFiltered = new Array<MessData>(); 
  public messDataToView = new Array<MessData>(); 
  public messData = new Array<MessData>(); 
  textFiltered = '';
  UsrInfo = {} as usrInfo;
  flagDelete = false;

    // Subscription service
    private sus_usrInfoServiceDelete!: Subscription;
    private sus_usrInfoServiceLoad!: Subscription;
    private sus_authService!: Subscription;

  constructor(public httpService: HttpService,
              public authService: AuthService,
              private usrInfoService: UsrInfoService) { }

  ngOnInit(): void {

    this.updateSent(); 
    
  }

  ngOnDestroy () {

    this.sus_authService.unsubscribe();
    this.sus_usrInfoServiceLoad.unsubscribe();

    if (this.flagDelete) {
      this.sus_usrInfoServiceDelete.unsubscribe();
    }

  }

  // This function bring the messages to the sent box
  updateSent () {

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

  // This function is used to delete a message
  onDelete (id: number) {

    this.sus_usrInfoServiceDelete = this.httpService.getCall(this.URL_De + id).subscribe((data) => {this.messData = data.reverse()
      this.messDataToView = this.messData;
    });
    this.flagDelete = true;

  }
  
}
