import { Component, Input, OnInit } from '@angular/core';
import { Info } from 'src/app/models/info.model';
import { InfoService } from 'src/app/services/info.service';

@Component({
  selector: 'info-editor',
  templateUrl: './info-editor.component.html',
  styleUrls: ['./info-editor.component.scss'],
})
export class InfoEditorComponent implements OnInit {
  info: Info;

  isEditing: boolean = false;

  constructor(private infoService: InfoService) {}

  ngOnInit(): void {
    this.infoService.infoData.subscribe((data: Info) => {
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
