import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';

import { Storage } from '@ionic/storage';

import { Subscription } from 'rxjs';
import * as moment from 'moment';

import { Helper } from '../../providers/helper';
import { UserService } from '../../services/user-service';
import { AccountSettingsInterface } from './account-settings.interface';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.page.html',
  styleUrls: ['./account-settings.page.scss'],
  providers: [Helper, UserService],
})
export class AccountSettingsPage implements OnInit {
  
  public title: string;
  public data: FormGroup;
  public isValid: boolean;
  public submitted: boolean;
  public token: string;
  
  private subsUpdateUser: Subscription;
  private subsDetailUser: Subscription;
  private subsCreditReport: Subscription;
  private errorMsg: any;

  constructor(
    private helper: Helper,
    private storage: Storage,
    private router: Router,
    private userService: UserService
  ) {
    this.title = 'Account Settings';

    this.errorMsg = {};
    this.submitted = false;
    this.isValid = true;

    const parameter = {
      fullname: ['', [Validators.required]],
      middlename: [''],
      last_name: [''],
      dob: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      residential_address: ['', [Validators.required]],
      previous_address: ['', [Validators.required]],
      offers: [0],
      newsletter: [0],
      email: [''],
      mobile_number: [''],
    };
    this.data = this.helper.createForm(parameter);
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      let current_route = this.router.url.toString();
      if (event instanceof NavigationEnd && current_route === '/account-settings') {        
        this.initForm();
      }
    });

    this.initForm();
  }

  private initForm() {
    this.helper.checkLogin('logout');

    this.storage.get('token').then((val) => {
      if(val !== null) {
        this.token = val;
        this.getCreditReport(val);
        this.getDetailUser(val);
      }
    });
  }

  private getDetailUser(token: string) {
    if (this.subsDetailUser != undefined) {
      this.subsDetailUser.unsubscribe();
    }

    this.subsDetailUser = this.userService.getDetailUser(token).subscribe(
      (result) => {
        const data = result['user'];
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            if(key === 'isSubscribeOffer') {
              this.data.controls['offers'].setValue(data[key]);
            } else if(key === 'isSubscribeNewsletter') {
              this.data.controls['newsletter'].setValue(data[key]);
            }

            if(typeof this.data.controls[key] !== 'undefined') {
              this.data.controls[key].setValue(data[key]);
            }
          }
        }
      },
      err => {
        console.log(err);
    });
  }

  private getCreditReport(token: string) {
    if (this.subsCreditReport != undefined) {
      this.subsCreditReport.unsubscribe();
    }

    this.subsCreditReport = this.userService.getCreditReport(token).subscribe(
      (result) => {
        const data = result['data']['personInfo'];
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            if(key === 'addresses') {
              this.data.controls['residential_address'].setValue(data[key][0]['address']);
              this.data.controls['previous_address'].setValue(data[key][1]['address']);
            }
            if(typeof this.data.controls[key] !== 'undefined') {
              if(key === 'dob') {
                let dob = moment(data[key], 'YYYY-MM-DD').format('YYYY-MM-DD');
                this.data.controls[key].setValue(dob);
              } else {
                this.data.controls[key].setValue(data[key]);
              }
            }
          }
        }
      },
      err => {
        console.log(err);
    });
  }

  public save(data: AccountSettingsInterface, isValid: boolean) {
    this.submitted = true;
    this.isValid = isValid;
    
    if (this.subsUpdateUser != undefined) {
      this.subsUpdateUser.unsubscribe();
    }
    if(isValid === true)  {
      let offers = this.data.controls['offers'].value;
      let newsletter = this.data.controls['newsletter'].value;
      let mobile_number = this.data.controls['mobile_number'].value;

      if(offers) {
        offers = 1;
      } else {
        offers = 0;
      }

      if(newsletter) {
        newsletter = 1;
      } else {
        newsletter = 0;
      }

      if(mobile_number === null) {
        mobile_number = '';
      }

      this.data.controls['offers'].setValue(offers);
      this.data.controls['newsletter'].setValue(newsletter);
      this.data.controls['mobile_number'].setValue(mobile_number);

      data = this.data.value;

      console.log(data);
      this.helper.showLoading('Wait for just moment');
      this.subsUpdateUser = this.userService.updateUser(data, this.token).subscribe(
        (result) => {
          console.log(result);
          this.helper.dismissLoading();
          this.resetForm(this.data);
          this.errorMsg['title'] = 'Success';
          this.errorMsg['message'] = 'Data has been saved';
          this.helper.showAlert(this.errorMsg['title'], '', this.errorMsg['message']);
        },
        err => {
          let error = JSON.parse(err['_body']);
          this.helper.dismissLoading();
          this.errorMsg = JSON.parse(err['_body']);
          this.errorMsg['title'] = 'Error';
          this.errorMsg['message'] = error['data'];
          this.helper.showAlert(this.errorMsg['title'], '', this.errorMsg['message']);
      });
    }
  }

  private resetForm(form: FormGroup) {
    this.submitted = false;
    this.initForm();
  }

  public checkValue(isValid: boolean) {
    this.isValid = isValid;
  }

}
