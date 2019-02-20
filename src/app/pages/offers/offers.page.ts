import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { Helper } from '../../providers/helper';
import { offersData } from '../../providers/globals';

import { OffersInterface } from './offers.interface';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
  providers: [Helper],
})
export class OffersPage implements OnInit {

  public offers: OffersInterface;

  public menuSelected: string;
  public title: string;
  public username: string;

  constructor(
    private helper: Helper,
    private router: Router
  ) {
    this.menuSelected = 'offers';
    this.title = 'Offers';

    this.offers = offersData;
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      let current_route = this.router.url.toString();
      if (event instanceof NavigationEnd && current_route === '/offers') {        
        this.initForm();
      }
    });
    
    this.initForm();
  }

  private initForm() {
    this.helper.checkLogin('logout');
  }

  public navigate(url: string) {
    this.helper.navigate(url);
  }

}
