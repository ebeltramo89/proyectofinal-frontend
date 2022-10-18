import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false)
  loggedIn$ = this.loggedIn.asObservable();

  constructor() { }

  public setUsrData(data: boolean) {
    this.loggedIn.next(data)
  }

}
