import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.page.html',
  styleUrls: ['./how-it-works.page.scss'],
})
export class HowItWorksPage implements OnInit {
  
  public title: string;

  constructor(

  ) {
    this.title = 'How It Works';
  }

  ngOnInit() {
  }

}
