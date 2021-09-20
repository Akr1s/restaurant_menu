import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import infoServiceRoutes from '../constants/infoServiceRoutes';
import { RestInfo } from '../models/restInfo.model';

@Injectable({
  providedIn: 'root',
})
export class InfoService {
  constructor(private http: HttpClient) {}

  getRestInfo(): Observable<RestInfo> {
    return this.http.get<RestInfo>(infoServiceRoutes.getRestInfo);
  }
}
