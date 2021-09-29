import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RESPONSE_CODES } from 'src/app/constants/responseCodes';
import { InfoInterface } from 'src/app/interfaces/info';
import { InfoService } from 'src/app/services/info.service';

@Component({
  selector: 'info-form',
  templateUrl: './info-form.component.html',
  styleUrls: ['./info-form.component.scss'],
})
export class InfoFormComponent implements OnInit {
  @Input() info: InfoInterface;
  @Input() cancelEditing: () => void;

  constructor(private fb: FormBuilder, private infoService: InfoService) {}

  infoForm = this.fb.group({
    title: ['', [Validators.maxLength(25), Validators.required]],
    address: ['', [Validators.maxLength(50), Validators.required]],
    tel: ['', [Validators.maxLength(15), Validators.required]],
    wifi: ['', [Validators.maxLength(63)]],
  });

  async onSubmit() {
    const responseCode = await this.infoService.updateInfo(this.infoForm.value);
    if (responseCode === RESPONSE_CODES.UPDATE_SUCCESS) {
      alert('Info Updated');
      this.cancelEditing();
    }
  }

  pathFormData() {
    this.infoForm.patchValue({ ...this.info });
  }

  ngOnInit(): void {
    this.pathFormData();
  }
}
