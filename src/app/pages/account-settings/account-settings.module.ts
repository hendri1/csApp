import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MomentModule } from 'ngx-moment';

import { AccountSettingsPage } from './account-settings.page';

import { ComponentsModule } from '../../modules/components.module';

const routes: Routes = [
  {
    path: '',
    component: AccountSettingsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ComponentsModule,
    MomentModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AccountSettingsPage]
})
export class AccountSettingsPageModule {}
