import { Component, Input, OnInit } from '@angular/core';
import { Info } from 'src/app/models/info.model';
import { InfoService } from 'src/app/services/info.service';

@Component({
  selector: 'info-editor',
  templateUrl: './info-editor.component.html',
  styleUrls: ['./info-editor.component.scss'],
})
export class InfoEditorComponent implements OnInit {
  info: Info = {
    id: 4,
    title: 'Home',
    address: 'Far, far away',
    tel: '+380971234567',
    wifi: '11111121',
  }; //replace later

  constructor(private infoService: InfoService) {}

  ngOnInit(): void {
    this.infoService.getInfo().subscribe((data: Info) => {
      this.info = data;
    });
  }
}