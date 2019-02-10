import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiVariable } from '../providers/globals';

@Injectable()
export class UserService {

  constructor(
    private http: Http,
  ) {

  }

  public getCreditReport(token: string): Observable<boolean> {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer '+ token);
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let url = ApiVariable.apiDev + '/api/users/credit-report';
    return this.http.get(url, options)
    .pipe(map((response: any) => {
      let res = response.json();
      if (res) {
        return res;
      }
    }));
  }

  public getScore(token: string): Observable<boolean> {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer '+ token);
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let url = ApiVariable.apiDev + '/api/users/scores';
    return this.http.get(url, options)
    .pipe(map((response: any) => {
      let res = response.json();
      if (res) {
        return res;
      }
    }));
  }

}