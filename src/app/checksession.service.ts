import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChecksessionService {

  constructor(private http: HttpClient) { }

  getCall(URL: string): Observable<boolean> {
    return this.http.get<boolean>(URL, {withCredentials: true})
  }


}
