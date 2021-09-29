import { Component, Input, OnInit } from '@angular/core';
import { InfoInterface } from 'src/app/interfaces/info';

@Component({
  selector: 'info-view',
  templateUrl: './info-view.component.html',
  styleUrls: ['./info-view.component.scss'],
})
export class InfoViewComponent implements OnInit {
  @Input() info: InfoInterface;

  constructor() {}

  ngOnInit(): void {}
}
