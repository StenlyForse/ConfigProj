import { Component } from '@angular/core';
import { CatalogElem } from 'src/app/models/catalog.model';
import { CatalogService } from 'src/app/services/catalog.service';
import { ConfiguratorService } from 'src/app/services/configurator.service';
import { ConfigElem } from 'src/app/models/config.model';

@Component({
  selector: 'app-configurator',
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.css']
})
export class ConfiguratorComponent {
  catalog: CatalogElem[] = [];
  configArr: ConfigElem[] = [];

  constructor(private configuratorService: ConfiguratorService) { }

  ngOnInit(): void {

    this.configuratorService.getCatalogK3()
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
      this.configArr[i] = {id: 0, catalogId: this.catalog[i].id, name: this.catalog[i].name, count: 0, boundleid: 0 };
    }
  }


  onInputBlur(index: number) {
    if (this.configArr[index].count === undefined) {
      // Если значение в count пусто, устанавливаем значение из placeholder (например, 0)
      this.configArr[index].count = 0;
    }
  }

  addConfig(): void {
    // Проверяем все значения count и устанавливаем значения по умолчанию, если не заполнены
    for (let i = 0; i < this.catalog.length; i++) {
      if (this.configArr[i].count === undefined) {
        // Если значение в count пусто, устанавливаем значение из placeholder (например, 0)
        this.configArr[i].count = 0;
      }
    }

    this.configuratorService.addConfig(this.configArr)
    .subscribe({
      next: (configElem) => {
        alert('Succesfully added');
      },
      error: (response) => {
        console.log(response)
      }
      
    })
    
    console.log(this.configArr);
  }
}
