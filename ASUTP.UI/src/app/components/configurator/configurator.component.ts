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
  configElem: any[] = [];
  items: string[] = [];

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

    this.configuratorService.getBoundlesList().subscribe(
      (data) => {
        this.items = data; // Заполнение массива данными из API
      },
      (error) => {
        console.log('Ошибка при получении списка:', error);
      }
    );
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

  // Событие по изменению значения в выпадающем списке

  selectedItem: string = ''; // Выбранный элемент из списка
  onChangeItem(event: any): void {
    // Получение выбранного элемента из списка
    this.selectedItem = event.target.value;

    // Получение данных для выбранного элемента и заполнение массива configElem
    const selectedData = this.getSelectedData(this.selectedItem);
    this.configElem = selectedData;
  }
  getSelectedData(selectedItem: string): any[] {
    // Вам нужно здесь реализовать получение данных из API
    // для выбранного элемента (selectedItem),
    // либо преобразование данных из this.items на основе выбранного элемента.
    // Верните массив с данными, связанными с выбранным элементом.
    // Примерно так:
    // const selectedData = this.apiService.getDataForSelectedItem(selectedItem);
    // return selectedData;
    return [10]
  }
}
