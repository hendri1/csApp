import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { menuHeader } from '../../providers/globals';
import { Helper } from '../../providers/helper';
import { AuthService } from '../../services/auth-service';
import { FirebaseAuthService } from '../../services/firebase-auth-service';

import { MenuInterface } from './header.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [AuthService, FirebaseAuthService, Helper],
})
export class HeaderComponent implements OnInit {

  public menu: MenuInterface;

  @ViewChild('sidenav') sidenav: MatSidenav;
  @Input() title: string;
  @Input() isDashboard: boolean;
  @Input() isDashboardHelp: boolean;

  constructor(
    private helper: Helper,
    private authService: AuthService,
    private firebaseAuthService: FirebaseAuthService
  ) { 
    this.menu = menuHeader;
  }

  ngOnInit() {
  }

  public navigate(url: string) {    
    this.helper.navigate(url);
    this.sidenav.close();
  }

  public logout() {
    this.firebaseAuthService.logout();
    this.authService.logout();
  }

  public openMenu() {
    let container = document.getElementById('nav');
    container.style.zIndex = '9999999';
    this.sidenav.open();
  }

  public closeMenu() {
    let container = document.getElementById('nav');
    container.style.zIndex = '999';
    this.sidenav.close();
  }

}
