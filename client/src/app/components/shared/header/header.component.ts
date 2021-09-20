import { Component, Input } from '@angular/core';
import { Title } from 'src/app/models/title.model';
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
    this.infoService.getTitle().subscribe((data: Title) => {
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
