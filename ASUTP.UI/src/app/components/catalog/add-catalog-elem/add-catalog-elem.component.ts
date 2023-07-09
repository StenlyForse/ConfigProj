import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CatalogElem } from 'src/app/models/catalog.model';
import { CatalogService } from 'src/app/services/catalog.service';

@Component({
  selector: 'app-add-catalog-elem',
  templateUrl: './add-catalog-elem.component.html',
  styleUrls: ['./add-catalog-elem.component.css']
})
export class AddCatalogElemComponent implements OnInit{

  // Пустой элемент, который потом в API заполняется
  addCatalogElementRequest: CatalogElem = {
    //id: '',
    id: 0,
    element: '',
    reference: '',
    name: '',
    price_wo_tax: 0,
    currency: '',
    comment: ''
  }

  constructor(private catalogService: CatalogService, private router: Router) { }

  ngOnInit(): void {
    
  }

  addCatalogElem() {
    this.catalogService.addCatalogElement(this.addCatalogElementRequest)
    .subscribe({
      next: (catalogElem) => {
        alert('Succesfully added');
      }
      
    })
  }
}
