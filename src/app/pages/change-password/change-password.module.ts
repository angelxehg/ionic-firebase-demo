import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangePasswordPageRoutingModule } from './change-password-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

import { ChangePasswordPage } from './change-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ChangePasswordPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [ChangePasswordPage]
})
export class ChangePasswordPageModule {}
