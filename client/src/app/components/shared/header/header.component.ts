import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { InfoInterface } from 'src/app/interfaces/info';
import { InfoService } from 'src/app/services/info.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class Header implements OnInit, OnDestroy {
  @Input() info!: boolean;
  isModalOpened: boolean = false;
  sub: Subscription;

  title: string = 'Restaurant';

  constructor(private infoService: InfoService) {}

  ngOnInit() {
    this.sub = this.infoService.infoData.subscribe((data: InfoInterface) => {
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
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
