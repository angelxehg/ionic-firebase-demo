import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-center-layout',
  templateUrl: './center-layout.component.html',
  styleUrls: ['./center-layout.component.scss'],
})
export class CenterLayoutComponent {

  @Input() header;
  @Input() message;

  constructor() { }
}
