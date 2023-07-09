import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogElem } from 'src/app/models/catalog.model';
import { CatalogService } from 'src/app/services/catalog.service';

@Component({
  selector: 'app-edit-catalog-elem',
  templateUrl: './edit-catalog-elem.component.html',
  styleUrls: ['./edit-catalog-elem.component.css']
})
export class EditCatalogElemComponent implements OnInit{

 // Пустой элемент, который заполняется в API
  catalogElemDetails: CatalogElem = {
    //id: '',
    id: 0, //смена id на number
    element: '',
    reference: '',
    name: '',
    price_wo_tax: 0,
    currency: '',
    comment: ''
  }

  constructor(private route: ActivatedRoute, private catalogService: CatalogService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');

        if (id) {
          // вызов api
          this.catalogService.getCatalogElement(parseInt(id, 10)) // тут почему-то не сменилось нормально, пришлось парсить
          .subscribe({
            next: (response) => {
              this.catalogElemDetails = response;
            },
            error: (response) => {
              console.log(response)
            }
          })
        }

      }
    })
  }

  updateCatalogElem() {
    this.catalogService.updateCatalogElement(this.catalogElemDetails.id, this.catalogElemDetails)
    .subscribe({
      next: (response) => {
        // Возвращаемся назад в список
        this.router.navigate(['catalog'])
      }
    })
  }

  deleteCatalogElem(id: /*string*/number) { //смена id на number
    this.catalogService.deleteCatalogElement(id)
    .subscribe({
      next: (response) => {
        this.router.navigate(['catalog'])
      }
    })
  }

}

