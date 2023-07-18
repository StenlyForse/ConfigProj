import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CatalogElem } from '../models/catalog.model';
import { Observable } from 'rxjs';

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
}