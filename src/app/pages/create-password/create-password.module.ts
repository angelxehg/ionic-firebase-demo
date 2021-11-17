import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatePasswordPageRoutingModule } from './create-password-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

import { CreatePasswordPage } from './create-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreatePasswordPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [CreatePasswordPage]
})
export class CreatePasswordPageModule {}
