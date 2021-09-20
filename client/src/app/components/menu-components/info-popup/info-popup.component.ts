import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-popup',
  templateUrl: './info-popup.component.html',
  styleUrls: ['./info-popup.component.scss'],
})
export class InfoPopupComponent {
  @Input() closeModal: () => void;
  @Input() isModalOpened: boolean;
  address: string = 'Somewhere';
  tel: string = '1234567890';
  wifi: string = 'Free';

  constructor() {}

  ngOnInit() {}
}
