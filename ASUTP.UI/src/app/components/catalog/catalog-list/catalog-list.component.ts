import { Component } from '@angular/core';
import { CatalogElem } from 'src/app/models/catalog.model';
import { CatalogService } from 'src/app/services/catalog.service';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-catalog-list',
  templateUrl: './catalog-list.component.html',
  styleUrls: ['./catalog-list.component.css']
})
export class CatalogListComponent {
  catalog: CatalogElem[] = [
    /*{
      id: '1',
      element: 'Тестовый элемент 1',
      reference: '1444-5555-1113',
      name: 'Мышь компьютерная',
      price: 200,
      curr: 'RUR',
      note: 'Серая'
    },
    {
      id: '2',
      element: 'Тестовый элемент 1',
      reference: '777-111-1234',
      name: 'Монитор компьютерный',
      price: 14000,
      curr: 'RUR',
      note: ''
    },
    {
      id: '3',
      element: 'Тестовый элемент 3',
      reference: '888-888-999',
      name: 'Macbook pro',
      price: 1600,
      curr: 'USD',
      note: 'Весьма ценный'
    }*/
  ];


  constructor(private catalogService: CatalogService) { }

  ngOnInit(): void {
    this.catalogService.getCatalog()
    .subscribe({
      next: (catalog) => {
        this.catalog = catalog;
      },
      error: (response) => {
        console.log(response)
      }
    })

  }
}
