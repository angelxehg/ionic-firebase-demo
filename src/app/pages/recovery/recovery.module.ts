import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecoveryPageRoutingModule } from './recovery-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

import { RecoveryPage } from './recovery.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RecoveryPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [RecoveryPage]
})
export class RecoveryPageModule {}
