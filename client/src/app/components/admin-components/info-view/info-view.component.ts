import { Component, Input, OnInit } from '@angular/core';
import { Info } from 'src/app/models/info.model';

@Component({
  selector: 'info-view',
  templateUrl: './info-view.component.html',
  styleUrls: ['./info-view.component.scss'],
})
export class InfoViewComponent implements OnInit {
  @Input() info: Info;

  constructor() {}

  ngOnInit(): void {}
}
