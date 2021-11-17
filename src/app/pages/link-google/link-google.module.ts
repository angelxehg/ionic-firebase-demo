import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from 'src/app/components/components.module';
import { LinkGooglePageRoutingModule } from './link-google-routing.module';

import { LinkGooglePage } from './link-google.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LinkGooglePageRoutingModule,
    ComponentsModule,
  ],
  declarations: [LinkGooglePage]
})
export class LinkGooglePageModule {}
