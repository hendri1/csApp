import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Storage } from '@ionic/storage';

import { Subscription } from 'rxjs';

import { AuthService } from '../../services/auth-service';
import { Helper } from '../../providers/helper';
import { UserInterface } from './forgot-password.interface';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  providers: [AuthService, Helper],
})
export class ForgotPasswordPage implements OnInit {

  public user: FormGroup;
  public isValid: boolean;
  public submitted: boolean;
  
  private subsLogin: Subscription;
  private errorMsg: string;

  constructor(
    private storage: Storage,
    private authService: AuthService,
    private helper: Helper,
    private formBuilder: FormBuilder
  ) { 
    this.errorMsg = '';
    this.submitted = false;
    this.isValid = true;

    this.user = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    console.log('forgot password has been init');

    this.helper.checkLogin('login');
  }

  public forgotPassword(user: UserInterface, isValid: boolean) {

  }

  public checkValue(isValid: boolean) {
    this.isValid = isValid;
  }

  public navigate(url: string) {
    this.helper.navigate(url);
  }

}
