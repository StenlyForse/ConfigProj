import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CatalogElem } from '../models/catalog.model';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { ConfigElem } from '../models/config.model';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ConfiguratorService {

  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  // Получение модулей К3
  getCatalogK3(): Observable<CatalogElem[]>{
    return this.http.get<CatalogElem[]>(this.baseApiUrl + '/api/configurator', )
  }

  addConfig(addConfigRequest: ConfigElem[]): Observable<ConfigElem[]> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = {
    headers: headers,
    responseType: 'text'     // <-- set response type as `text`
    };
    return this.http.post<ConfigElem[]>(this.baseApiUrl + '/api/configurator', addConfigRequest)
  }
  
  getBoundlesList(): Observable<any[]>{
    return this.http.get<any[]>(this.baseApiUrl + '/api/configurator/configList')
  }

  // Отправка вместе с параметром
  getBoundlesDataList(boudnleId: number): Observable<any>{
    //return this.http.get<ConfigElem[]>(this.baseApiUrl + '/api/configurator/configList?boundleid=' + boudnleId )
    return this.http.get<ConfigElem[]>(this.baseApiUrl + '/api/configurator/configList/' + boudnleId )
  }

    updateBoundlesDataList(boudnleID: number, updateBoundlesDataListRequest: any): Observable<any>{
      return this.http.put<ConfigElem[]>(this.baseApiUrl + '/api/configurator/configList/' + boudnleID, updateBoundlesDataListRequest )
    }
}