import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

import { Storage } from '@ionic/storage';

import { Subscription } from 'rxjs';

import { AuthService } from '../../services/auth-service';
import { Helper } from '../../providers/helper';
import { UserInterface } from './sign-up-three.interface';

@Component({
  selector: 'app-sign-up-three',
  templateUrl: './sign-up-three.page.html',
  styleUrls: ['./sign-up-three.page.scss'],
  providers: [AuthService, Helper],
})
export class SignUpThreePage implements OnInit {

  public user: FormGroup;
  public isValid: boolean;
  public submitted: boolean;

  private subsRegister: Subscription;
  private errorMsg: any;

  constructor(
    private helper: Helper,
    private authService: AuthService,
    private storage: Storage
  ) { 
    this.errorMsg = {};
    this.submitted = false;
    this.isValid = true;

    const parameter = {
      full_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', [Validators.required]],
      address: ['', [Validators.required]],
      mobile_number: ['', [Validators.required]],
      driver_license_number: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm_password: ['', [Validators.required, Validators.minLength(8)]]
    };
    this.user = this.helper.createForm(parameter);
  }

  ngOnInit() {
    console.log('sign up three has been init');

    this.storage.get('user').then((data) => {
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          this.user.controls[key].setValue(data[key]);
        }
      }
    });

    console.log(this.user);
  }

  public navigate(url: string) {
    this.helper.navigate(url);
  }

  public register(user: UserInterface, isValid: boolean) {    
    this.submitted = true;
    this.isValid = isValid;

    if (this.subsRegister != undefined) {
      this.subsRegister.unsubscribe();
    }

    if(isValid === true) {
      this.storage.set('user', user);

      this.helper.showLoading('Wait for just moment');
      this.subsRegister = this.authService.register(user).subscribe(
        (result) => {
          this.helper.dismissLoading();
          if (result['error'] === 0) {
            this.storage.remove('user');
            this.errorMsg['title'] = 'Information';
            this.errorMsg['message'] = result['data']['message'];
            this.helper.showAlert(this.errorMsg['title'], '', this.errorMsg['message']);

            setTimeout(() => {
              this.navigate('login');
            }, 2000);
          } else {
            this.errorMsg['title'] = 'Error';
            this.errorMsg['message'] = result['data']['error_form'][0];
            this.helper.showAlert(this.errorMsg['title'], '', this.errorMsg['message']);
          }
        },
        err => {
          this.helper.dismissLoading();
          this.errorMsg = JSON.parse(err['_body']);
          this.errorMsg['title'] = this.errorMsg['message'];
          this.errorMsg['message'] = 'Please try again and make sure that your email and password are correct';
          this.helper.showAlert(this.errorMsg['title'], '', this.errorMsg['message']);
      });
    }
  }

  public checkValue(isValid: boolean) {
    this.isValid = isValid;
  }

  private resetForm(form: FormGroup) {
    this.helper.resetForm(form);
    this.submitted = false;
  }

  public openWeb() {
    
  }

}
