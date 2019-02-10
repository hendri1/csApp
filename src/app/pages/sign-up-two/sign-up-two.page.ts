import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

import { Storage } from '@ionic/storage';

import { Helper } from '../../providers/helper';
import { UserInterface } from './sign-up-two.interface';

@Component({
  selector: 'app-sign-up-two',
  templateUrl: './sign-up-two.page.html',
  styleUrls: ['./sign-up-two.page.scss'],
  providers: [Helper],
})
export class SignUpTwoPage implements OnInit {

  public user: FormGroup;
  public isValid: boolean;
  public submitted: boolean;

  constructor(
    private helper: Helper,
    private storage: Storage
  ) { 
    this.submitted = false;
    this.isValid = true;

    const parameter = {
      full_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', [Validators.required]],
      address: ['', [Validators.required]],
      mobile_number: ['', [Validators.required]],
      driver_license_number: ['', [Validators.required]]
    };
    this.user = this.helper.createForm(parameter);
  }

  ngOnInit() {
    console.log('sign up two has been init');
    
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

  public registerOne() {    
    this.helper.showLoadingWithDuration('Wait for Just Moment', 1500);

    setTimeout(() => {
      this.resetForm(this.user);
      this.navigate('sign-up-one');
    }, 2000);
  }

  public registerThree(user: UserInterface, isValid: boolean) {
    this.submitted = true;
    this.isValid = isValid;

    if(isValid === true) {
      this.storage.set('user', user);

      this.helper.showLoadingWithDuration('Wait for Just Moment', 1500);

      setTimeout(() => {
        this.resetForm(this.user);
        this.navigate('sign-up-three');
      }, 2000);
    }
  }

  public checkValue(isValid: boolean) {
    this.isValid = isValid;
  }

  private resetForm(form: FormGroup) {
    this.helper.resetForm(form);
    this.submitted = false;
  }

}
