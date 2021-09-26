import { Component, Input } from '@angular/core';
import { InfoInterface } from 'src/app/interfaces/info';
import { InfoService } from 'src/app/services/info.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class Header {
  @Input() info!: boolean;
  isModalOpened: boolean = false;

  title: string = 'Restaurant';

  constructor(private infoService: InfoService) {}

  ngOnInit() {
    this.infoService.infoData.subscribe((data: InfoInterface) => {
      this.title = data.title;
    });
  }

  openInfo(): void {
    this.openModal();
  }

  openModal() {
    this.isModalOpened = true;
  }

  public closeModal = (): void => {
    this.isModalOpened = false;
  };
}
