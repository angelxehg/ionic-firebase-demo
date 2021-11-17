import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from 'src/app/components/components.module';
import { VerifyPageRoutingModule } from './verify-routing.module';

import { VerifyPage } from './verify.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    VerifyPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [VerifyPage]
})
export class VerifyPageModule {}
