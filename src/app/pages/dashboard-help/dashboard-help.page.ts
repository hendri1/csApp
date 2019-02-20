import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { Helper } from '../../providers/helper';
import { dashboardHelp } from '../../providers/globals';
import { DashboardHelpInterface } from './dashboard-help.interface'

@Component({
  selector: 'app-dashboard-help',
  templateUrl: './dashboard-help.page.html',
  styleUrls: ['./dashboard-help.page.scss'],
  providers: [Helper],
})
export class DashboardHelpPage implements OnInit {

  public menuSelected: string;
  public title: string;

  public data: DashboardHelpInterface;

  constructor(
    private helper: Helper,
    private router: Router
  ) {
    this.menuSelected = 'dashboard-help';
    this.title = 'Dashboard Help';
    this.data = dashboardHelp;
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      let current_route = this.router.url.toString();
      if (event instanceof NavigationEnd && current_route === '/dashboard-help') {        
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
