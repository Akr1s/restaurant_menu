import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { infoMock } from '../constants/dataMocks';
import infoServiceRoutes from '../constants/infoServiceRoutes';
import { RESPONSE_CODES } from '../constants/responseCodes';
import { Info } from '../models/info.model';
import { RestInfo } from '../models/restInfo.model';
import { Title } from '../models/title.model';

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
      console.log(data);
    });
  }

  async updateInfo(info: Info): Promise<number> {
    const responseCode = await this.http
      .put<number>(infoServiceRoutes.updateInfo, info)
      .toPromise();
    if (responseCode === RESPONSE_CODES.UPDATE_SUCCESS) {
      this.getInfoData();
    }
    return responseCode;
  }
}
