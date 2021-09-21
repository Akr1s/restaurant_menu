import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Info } from 'src/app/models/info.model';

@Component({
  selector: 'info-form',
  templateUrl: './info-form.component.html',
  styleUrls: ['./info-form.component.scss'],
})
export class InfoFormComponent implements OnInit {
  @Input() info: Info;

  constructor(private fb: FormBuilder) {}

  infoForm = this.fb.group({
    title: [''],
    address: [''],
    tel: [''],
    wifi: [''],
  });

  onSubmit() {
    console.log(this.infoForm.value);
  }

  pathFormData() {
    this.infoForm.patchValue({ ...this.info });
  }

  ngOnInit(): void {
    this.pathFormData();
  }
}
