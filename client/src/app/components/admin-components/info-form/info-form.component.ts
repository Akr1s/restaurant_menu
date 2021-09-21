import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Info } from 'src/app/models/info.model';
import { InfoService } from 'src/app/services/info.service';

@Component({
  selector: 'info-form',
  templateUrl: './info-form.component.html',
  styleUrls: ['./info-form.component.scss'],
})
export class InfoFormComponent implements OnInit {
  @Input() info: Info;
  @Input() cancelEditing: () => void;

  constructor(private fb: FormBuilder, private infoService: InfoService) {}

  infoForm = this.fb.group({
    title: ['', [Validators.maxLength(25), Validators.required]],
    address: ['', [Validators.maxLength(50), Validators.required]],
    tel: ['', [Validators.maxLength(15), Validators.required]],
    wifi: ['', [Validators.maxLength(63)]],
  });

  async onSubmit() {
    const responseCode = await this.infoService.postInfo(this.infoForm.value);
    if (responseCode === 81) {
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
