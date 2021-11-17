import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cancel-button',
  templateUrl: './cancel-button.component.html',
  styleUrls: ['./cancel-button.component.scss'],
})
export class CancelButtonComponent {

  @Input() disabled = false;

  constructor(private location: Location) { }

  cancelAction = () => this.location.back();
}
