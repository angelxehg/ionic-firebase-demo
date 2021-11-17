import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { CancelButtonComponent } from './cancel-button/cancel-button.component';
import { ResponsiveLayoutComponent } from './responsive-layout/responsive-layout.component';
import { ReauthenticateWallComponent } from './reauthenticate-wall/reauthenticate-wall.component';
import { CenterLayoutComponent } from './center-layout/center-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CancelButtonComponent,
    ResponsiveLayoutComponent,
    ReauthenticateWallComponent,
    CenterLayoutComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    IonicModule,
  ],
  exports: [
    CancelButtonComponent,
    ResponsiveLayoutComponent,
    ReauthenticateWallComponent,
    CenterLayoutComponent,
  ]
})
export class ComponentsModule { }
