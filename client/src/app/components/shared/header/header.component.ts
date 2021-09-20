import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class Header {
  @Input() info!: boolean;
  isModalOpened: boolean;

  title: string = 'Restaurant';

  ngOnInit(): void {
    this.isModalOpened = false;
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
