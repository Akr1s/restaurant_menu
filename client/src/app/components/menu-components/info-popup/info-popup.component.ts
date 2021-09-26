import { Component, Input, OnInit } from '@angular/core';
import { InfoInterface } from 'src/app/interfaces/info';
import { RestInfoInterface } from 'src/app/interfaces/restInfo';
import { InfoService } from 'src/app/services/info.service';

@Component({
  selector: 'app-info-popup',
  templateUrl: './info-popup.component.html',
  styleUrls: ['./info-popup.component.scss'],
})
export class InfoPopupComponent {
  @Input() closeModal: () => void;
  @Input() isModalOpened: boolean;
  restInfo: RestInfoInterface = {
    address: 'Unknown',
    tel: 'Does not exist',
    wifi: 'Free',
  };

  constructor(private infoService: InfoService) {}

  ngOnInit() {
    this.infoService.infoData.subscribe((data: InfoInterface) => {
      const { address, tel, wifi } = data;
      this.restInfo = { address, tel, wifi };
    });
  }
}
