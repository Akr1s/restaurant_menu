import { Component, Input, OnInit } from '@angular/core';
import { RestInfo } from 'src/app/models/restInfo.model';
import { InfoService } from 'src/app/services/info.service';

@Component({
  selector: 'app-info-popup',
  templateUrl: './info-popup.component.html',
  styleUrls: ['./info-popup.component.scss'],
})
export class InfoPopupComponent {
  @Input() closeModal: () => void;
  @Input() isModalOpened: boolean;
  restInfo: RestInfo = {
    address: 'Unknown',
    tel: 'Does not exist',
    wifi: 'Free',
  };

  constructor(private infoService: InfoService) {}

  ngOnInit() {
    this.infoService.getRestInfo().subscribe((data: RestInfo) => {
      this.restInfo = data;
    });
  }
}
