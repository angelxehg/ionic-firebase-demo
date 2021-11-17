import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeEmailPageRoutingModule } from './change-email-routing.module';
import { ComponentsModule } from '../../components/components.module';

import { ChangeEmailPage } from './change-email.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ChangeEmailPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [ChangeEmailPage]
})
export class ChangeEmailPageModule {}
