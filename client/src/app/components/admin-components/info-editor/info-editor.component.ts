import { Component, Input, OnInit } from '@angular/core';
import { InfoInterface } from 'src/app/interfaces/info';
import { InfoService } from 'src/app/services/info.service';

@Component({
  selector: 'info-editor',
  templateUrl: './info-editor.component.html',
  styleUrls: ['./info-editor.component.scss'],
})
export class InfoEditorComponent implements OnInit {
  info: InfoInterface;

  isEditing: boolean = false;

  constructor(private infoService: InfoService) {}

  ngOnInit(): void {
    this.infoService.infoData.subscribe((data: InfoInterface) => {
      this.info = data;
    });
  }

  enableEditing() {
    this.isEditing = true;
  }

  public cancelEditing = () => {
    this.isEditing = false;
  };
}
