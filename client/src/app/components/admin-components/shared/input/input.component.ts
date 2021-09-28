import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() id: string;
  @Input() label: string = '';
  @Input() placeholder: string = '';

  constructor() {}
  private _value: string;
  disabled = false;

  public get value(): string {
    return this._value;
  }

  public set value(v: string) {
    this._value = v;
    this.onChange(this._value);
    this.onTouched();
  }

  writeValue(value: string): void {
    this._value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onChange: any = () => {};

  onTouched: any = () => {};
}
