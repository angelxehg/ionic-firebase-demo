import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { AlertController } from '@ionic/angular';
import { FeaturesService } from './services/features.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private features: FeaturesService) {
    this.features.checkUpdates(true);
  }
}
