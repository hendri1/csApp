import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

import { Storage } from '@ionic/storage';

import { Subscription } from 'rxjs';

import { AuthService } from '../../services/auth-service';
import { Helper } from '../../providers/helper';
import { UserInterface } from './login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [AuthService, Helper],
})
export class LoginPage implements OnInit {

  public user: FormGroup;
  public isValid: boolean;
  public submitted: boolean;
  
  private subsLogin: Subscription;
  private errorMsg: any;

  constructor(
    private storage: Storage,
    private authService: AuthService,
    private helper: Helper
  ) { 
    this.errorMsg = {};
    this.submitted = false;
    this.isValid = true;

    const parameter = {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    };
    this.user = this.helper.createForm(parameter);
  }

  ngOnInit() {
    console.log('login has been init');

    this.helper.checkLogin('login');
  }

  public login(user: UserInterface, isValid: boolean) {
    this.submitted = true;
    this.isValid = isValid;
    
    if (this.subsLogin != undefined) {
      this.subsLogin.unsubscribe();
    }

    if(isValid === true)  {
      this.helper.showLoading('Wait for just moment');
      this.subsLogin = this.authService.login(user).subscribe(
        (result) => {
          this.helper.dismissLoading();
          if (result['token'] !== '') {
            this.storage.get('token').then((val) => {
              if(result['token'] !== val) {
                this.resetForm(this.user);
                this.navigate('dashboard');
              } else {
                this.errorMsg['title'] = 'Error';
                this.errorMsg['message'] = 'Token missmatch';
                this.helper.showAlert(this.errorMsg['title'], '', this.errorMsg['message']);
              }
            });
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

  private resetForm(form: FormGroup) {
    this.helper.resetForm(form);
    this.submitted = false;
  }

  public checkValue(isValid: boolean) {
    this.isValid = isValid;
  }

  public navigate(url: string) {
    this.helper.navigate(url);
  }

}
