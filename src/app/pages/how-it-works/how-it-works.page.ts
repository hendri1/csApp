import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { howItWorksData } from '../../providers/globals';

import { Helper } from '../../providers/helper';
import { HowItWorksInterface } from './how-it-works.interface';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.page.html',
  styleUrls: ['./how-it-works.page.scss'],
  providers: [Helper],
})
export class HowItWorksPage implements OnInit {
  
  public title: string;

  public data: HowItWorksInterface;

  constructor(
    private helper: Helper,
    private router: Router
  ) {
    this.title = 'How It Works';

    this.data = howItWorksData;
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      let current_route = this.router.url.toString();
      if (event instanceof NavigationEnd && current_route === '/how-it-works') {        
        this.initForm();
      }
    });
    
    this.initForm();
  }

  private initForm() {
    this.helper.checkLogin('logout');
  }

}
