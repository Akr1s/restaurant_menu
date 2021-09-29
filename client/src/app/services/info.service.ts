import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { defaultInfo } from '../constants/defaultInfo';
import infoServiceRoutes from '../constants/infoServiceRoutes';
import { RESPONSE_CODES } from '../constants/responseCodes';
import { InfoInterface } from '../interfaces/info';

@Injectable({
  providedIn: 'root',
})
export class InfoService {
  infoData = new BehaviorSubject<InfoInterface>(defaultInfo);

  constructor(private http: HttpClient) {
    this.getInfoData();
  }

  private getInfoData(): void {
    this.http
      .get<InfoInterface>(infoServiceRoutes.getInfo)
      .subscribe((data: InfoInterface) => {
        this.infoData.next(data);
      });
  }

  async updateInfo(info: InfoInterface): Promise<number> {
    const responseCode = await this.http
      .put<number>(infoServiceRoutes.updateInfo, info)
      .toPromise();
    if (responseCode === RESPONSE_CODES.UPDATE_SUCCESS) {
      this.infoData.next(info);
    }
    return responseCode;
  }
}
