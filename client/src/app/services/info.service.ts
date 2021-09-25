import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { infoMock } from '../constants/dataMocks';
import infoServiceRoutes from '../constants/infoServiceRoutes';
import { RESPONSE_CODES } from '../constants/responseCodes';
import { Info } from '../models/info.model';

@Injectable({
  providedIn: 'root',
})
export class InfoService {
  infoData = new BehaviorSubject<Info>(infoMock);

  constructor(private http: HttpClient) {
    this.getInfoData();
  }

  private getInfoData(): void {
    this.http.get<Info>(infoServiceRoutes.getInfo).subscribe((data: Info) => {
      this.infoData.next(data);
    });
  }

  async updateInfo(info: Info): Promise<number> {
    const responseCode = await this.http
      .put<number>(infoServiceRoutes.updateInfo, info)
      .toPromise();
    if (responseCode === RESPONSE_CODES.UPDATE_SUCCESS) {
      this.infoData.next(info);
    }
    return responseCode;
  }
}
