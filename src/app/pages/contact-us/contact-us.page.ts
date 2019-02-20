import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';

import { Subscription } from 'rxjs';

import { SupportService } from '../../services/support-service';
import { Helper } from '../../providers/helper';
import { ContactUsInterface } from './contact-us-interface';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
  providers: [SupportService, Helper],
})
export class ContactUsPage implements OnInit {

  public title: string;
  public data: FormGroup;
  public isValid: boolean;
  public submitted: boolean;
  
  private subsContact: Subscription;
  private errorMsg: any;

  constructor(
    private supportService: SupportService,
    private helper: Helper,
    private router: Router
  ) { 
    this.title = 'Contact Us';

    this.errorMsg = {};
    this.submitted = false;
    this.isValid = true;

    const parameter = {
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      messages: ['', [Validators.required]],
    };
    this.data = this.helper.createForm(parameter);
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      let current_route = this.router.url.toString();
      if (event instanceof NavigationEnd && current_route === '/contact-us') {        
        this.initForm();
      }
    });
    
    this.initForm();
  }

  private initForm() {
    this.helper.checkLogin('logout');
  }

  public contactUs(data: ContactUsInterface, isValid: boolean) {
    this.submitted = true;
    this.isValid = isValid;
    
    if (this.subsContact != undefined) {
      this.subsContact.unsubscribe();
    }
    if(isValid === true)  {
      this.helper.showLoading('Wait for just moment');
      this.subsContact = this.supportService.contactUs(data).subscribe(
        (result) => {
          console.log(result);
          this.helper.dismissLoading();
          this.resetForm(this.data);
          this.errorMsg['title'] = 'Success';
          this.errorMsg['message'] = result['data']['message'];
          this.helper.showAlert(this.errorMsg['title'], '', this.errorMsg['message']);
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

}
