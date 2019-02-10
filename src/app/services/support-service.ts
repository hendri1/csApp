import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiVariable } from '../providers/globals';

@Injectable()
export class SupportService {

  constructor(
    private http: Http,
  ) {

  }

  public contactUs(data: any): Observable<boolean> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    let params = 'firstname='+encodeURIComponent(data['name'])+'&email='+encodeURIComponent(data['email'])+'&subject='+encodeURIComponent(data['subject'])+'&messages='+encodeURIComponent(data['messages']);
    let url = ApiVariable.apiDev + '/api/contact-us';
    return this.http.post(url, params, options)
    .pipe(map((response: any) => {
      let res = response.json();
      if (res) {
        return res;
      }
    }));
  }

}