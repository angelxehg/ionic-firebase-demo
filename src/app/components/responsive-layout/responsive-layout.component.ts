import { Component } from '@angular/core';
import { FeaturesService } from 'src/app/services/features.service';

@Component({
  selector: 'app-responsive-layout',
  templateUrl: './responsive-layout.component.html',
  styleUrls: ['./responsive-layout.component.scss'],
})
export class ResponsiveLayoutComponent {

  constructor(public features: FeaturesService) { }

  activeColor(url) {
    const active = window.location.pathname.includes(url);
    return active ? 'primary' : '';
  }

}
