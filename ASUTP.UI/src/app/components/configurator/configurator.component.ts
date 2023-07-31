import { Component } from '@angular/core';
import { CatalogElem } from 'src/app/models/catalog.model';
import { CatalogService } from 'src/app/services/catalog.service';
import { ConfiguratorService } from 'src/app/services/configurator.service';

@Component({
  selector: 'app-configurator',
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.css']
})
export class ConfiguratorComponent {
  catalog: CatalogElem[] = [];
  items: any[] = [];

  constructor(private catalogService: ConfiguratorService) { }

  ngOnInit(): void {

    this.catalogService.getCatalogK3()
    .subscribe({
      next: (catalog) => {
        this.catalog = catalog;
        this.initializeItems();
      },
      error: (response) => {
        console.log(response)
      }
    })
  }

  // Инициализация массива
  initializeItems() {
    for (let i = 0; i < this.catalog.length; i++) {
      this.items[i] = { id: this.catalog[i].id, name: this.catalog[i].name, quantity: 0 };
    }
  }


  onInputBlur(index: number) {
    if (this.items[index].quantity === undefined) {
      // Если значение в quantity пусто, устанавливаем значение из placeholder (например, 0)
      this.items[index].quantity = 0;
    }
  }

  addConfig(): void {
    // Проверяем все значения quantity и устанавливаем значения по умолчанию, если не заполнены
    for (let i = 0; i < this.catalog.length; i++) {
      if (this.items[i].quantity === undefined) {
        // Если значение в quantity пусто, устанавливаем значение из placeholder (например, 0)
        this.items[i].quantity = 0;
      }
    }
    
    console.log(this.items);
  }

}
