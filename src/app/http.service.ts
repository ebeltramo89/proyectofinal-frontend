import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getCall(URL: string): Observable<any> {
    return this.http.get<any>(URL, {withCredentials: true})
  }

  postCall(URL: string, data: any): Observable<any> {
    return this.http.post<any>(URL, data, {withCredentials: true})
  }

}
