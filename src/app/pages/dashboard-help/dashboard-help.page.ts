import { Component, OnInit } from '@angular/core';

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
    private helper: Helper
  ) {
    this.menuSelected = 'dashboard-help';
    this.title = 'Dashboard Help';
    this.data = dashboardHelp;
  }

  ngOnInit() {
  }

  public navigate(url: string) {
    this.helper.navigate(url);
  }

}
