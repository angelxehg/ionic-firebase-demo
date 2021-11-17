import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabsLayoutComponent } from './tabs-layout/tabs-layout.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    TabsLayoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
  ],
  exports: [
    TabsLayoutComponent
  ]
})
export class LayoutsModule { }
