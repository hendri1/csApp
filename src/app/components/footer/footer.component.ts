import { Component, OnInit, Input } from '@angular/core';

import { menuFooter } from '../../providers/globals';
import { Helper } from '../../providers/helper';

import { MenuInterface } from './footer.interface';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  providers: [Helper],
})
export class FooterComponent implements OnInit {

  public menu: MenuInterface;

  @Input() menuSelected: string;

  constructor(
    private helper: Helper
  ) {
    this.menu = menuFooter;
  }

  ngOnInit() {
  }

  public navigate(url: string) {
    this.helper.navigate(url);
  }

}
