import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

import { Storage } from '@ionic/storage';

import { Helper } from '../../providers/helper';
import { FirebaseAuthService } from '../../services/firebase-auth-service';
import { UserInterface } from './sign-up.interface';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  providers: [Helper, FirebaseAuthService],
})
export class SignUpPage implements OnInit {

  public user: FormGroup;
  public isValid: boolean;
  public submitted: boolean;

  constructor(
    private helper: Helper,
    private storage: Storage,
    private firebaseAuthService: FirebaseAuthService
  ) { 
    this.submitted = false;
    this.isValid = true;

    const parameter = {
      email: ['', [Validators.required, Validators.email]]
    };
    this.user = this.helper.createForm(parameter);
  }

  ngOnInit() {
    console.log('sign up has been init');

    this.helper.checkLogin('login');

    this.storage.get('user').then((val) => {
      console.log(val);
    });
  }

  public navigate(url: string) {
    this.helper.navigate(url);
  }

  public register(user: UserInterface, isValid: boolean) {   
    this.submitted = true;
    this.isValid = isValid;

    if(isValid === true) {
      this.storage.set('user', user);

      this.helper.showLoadingWithDuration('Wait for Just Moment', 1500);

      setTimeout(() => {
        this.resetForm(this.user);
        this.navigate('sign-up-one');
      }, 2000);
    }
  }

  public registerGoogle() {
    this.firebaseAuthService.loginGoogle();
  }

  public registerFacebook() {
    this.firebaseAuthService.loginFacebook();
  }

  public checkValue(isValid: boolean) {
    this.isValid = isValid;
  }

  private resetForm(form: FormGroup) {
    this.helper.resetForm(form);
    this.submitted = false;
  }

}
