import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import infoServiceRoutes from '../constants/infoServiceRoutes';
import { Info } from '../models/info.model';
import { RestInfo } from '../models/restInfo.model';
import { Title } from '../models/title.model';

@Injectable({
  providedIn: 'root',
})
export class InfoService {
  constructor(private http: HttpClient) {}

  getRestInfo(): Observable<RestInfo> {
    return this.http.get<RestInfo>(infoServiceRoutes.getRestInfo);
  }
  getTitle(): Observable<Title> {
    return this.http.get<Title>(infoServiceRoutes.getTitle);
  }

  getInfo(): Observable<Info> {
    return this.http.get<Info>(infoServiceRoutes.getInfo);
  }
}
