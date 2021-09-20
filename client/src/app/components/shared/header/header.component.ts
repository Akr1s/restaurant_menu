import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class Header {
  @Input() info!: boolean;
  isModalOpened: boolean = false;

  title: string = 'Restaurant';

  ngOnInit() {}

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
