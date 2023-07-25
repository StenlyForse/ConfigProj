import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CatalogElem } from '../models/catalog.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  baseApiUrl = environment.baseApiUrl;

  constructor(private http: HttpClient) { }


  getCatalog(): Observable<CatalogElem[]>{
    return this.http.get<CatalogElem[]>(this.baseApiUrl + '/api/catalog', )
  }

  addCatalogElement(addCatalogElementRequest: CatalogElem): Observable<CatalogElem> {
    addCatalogElementRequest.id = 0/*'00000000-0000-0000-0000-000000000000'*/ //смена id на number
    return this.http.post<CatalogElem>(this.baseApiUrl + '/api/catalog', addCatalogElementRequest)
  }

  // Переходим на страницу конкретного элемента
  getCatalogElement(id: /*string*/number): Observable<CatalogElem> { //смена id на number
    return this.http.get<CatalogElem>(this.baseApiUrl + '/api/catalog/' + id)
  }

  updateCatalogElement(id: /*string*/number, updateCatalogElementRequest: CatalogElem): Observable<CatalogElem> { //смена id на number
    return this.http.put<CatalogElem>(this.baseApiUrl + '/api/catalog/' + id, updateCatalogElementRequest);
  }

  deleteCatalogElement(id: /*string*/number): Observable<CatalogElem> { //смена id на number
    return this.http.delete<CatalogElem>(this.baseApiUrl + '/api/catalog/' + id);
  }
}
