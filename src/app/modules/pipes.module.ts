import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { htmlEscapePipe } from '../providers/html-escape.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [
    htmlEscapePipe
  ],
  exports: [
    htmlEscapePipe
  ]
})
export class PipesModules { }