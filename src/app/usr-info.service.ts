import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { usrInfo }  from './types';

@Injectable({
  providedIn: 'root'
})
export class UsrInfoService {

  constructor(private http: HttpClient) { }

  getCall(URL: string): Observable<usrInfo> {
    return this.http.get<usrInfo>(URL, {withCredentials: true})
  }

}
