import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LinkGooglePage } from './link-google.page';

const routes: Routes = [
  {
    path: '',
    component: LinkGooglePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LinkGooglePageRoutingModule {}
