import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

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
    let url = environment.api + '/api/users/credit-report';
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
    let url = environment.api + '/api/users/scores';
    return this.http.get(url, options)
    .pipe(map((response: any) => {
      let res = response.json();
      if (res) {
        return res;
      }
    }));
  }

  public getDetailUser(token: string): Observable<boolean> {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer '+ token);
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let url = environment.api + '/api';
    return this.http.get(url, options)
    .pipe(map((response: any) => {
      let res = response.json();
      if (res) {
        return res;
      }
    }));
  }

  public updateUser(data: any, token: string): Observable<boolean> {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer '+ token);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    let params = 'is_subs_news='+data['newsletter']+'&is_subs_offer='+data['offers']+'&new_phone_number='+encodeURIComponent(data['mobile_number']);
    let url = environment.api + '/api/update-user-detail';
    return this.http.post(url, params, options)
    .pipe(map((response: any) => {
      let res = response.json();
      if (res) {
        return res;
      }
    }));
  }

}