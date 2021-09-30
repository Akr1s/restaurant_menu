import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { InfoInterface } from 'src/app/interfaces/info';
import { InfoService } from 'src/app/services/info.service';

@Component({
  selector: 'info-editor',
  templateUrl: './info-editor.component.html',
})
export class InfoEditorComponent implements OnInit, OnDestroy {
  info: InfoInterface;

  isEditing: boolean = false;
  sub: Subscription;

  constructor(private infoService: InfoService) {}

  ngOnInit(): void {
    this.sub = this.infoService.infoData.subscribe((data: InfoInterface) => {
      this.info = data;
    });
  }

  enableEditing() {
    this.isEditing = true;
  }

  public cancelEditing = () => {
    this.isEditing = false;
  };

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
