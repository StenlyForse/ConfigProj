import { Component } from '@angular/core';
import { ConfiguratorService } from 'src/app/services/configurator.service';
import { ConfigElem } from 'src/app/models/config.model';

@Component({
  selector: 'app-configs-list',
  templateUrl: './configs-list.component.html',
  styleUrls: ['./configs-list.component.css']
})
export class ConfigsListComponent {

  constructor(private configuratorService: ConfiguratorService) { }
  configElem: any[] = [];
  items: string[] = [];
  config: ConfigElem[] = [];

  ngOnInit(): void {

    this.configuratorService.getBoundlesList().subscribe(
      (dat) => {
        this.items = dat; // Заполнение массива данными из API
      },
      (error) => {
        console.log('Ошибка при получении списка:', error);
      }
    );
  }

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
    if (selectedItem == "2") {
      this.config = [
        {
          id: 1,
          catalogId: 1,
          boundleid: 3,
          count: 5
        }
      ]
    }
    return [10]
  }
}
