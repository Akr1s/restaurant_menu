import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() btnText: string;
  @Input() ok: boolean = false;
  @Input() submit: boolean = false;
  @Input() cancel: boolean = false;
  @Input() small: boolean = false;
  @Input() add: boolean = false;
  @Input() close: boolean = false;
  @Input() largeFont: boolean = false;
  @Input() isDisabled: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
