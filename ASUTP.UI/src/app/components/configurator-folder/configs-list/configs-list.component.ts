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
  config: any[] = [];

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
  // Получение конфигурации по выбранному айти из выпадающего списка
  getSelectedData(selectedItem: string): any[] {
    this.configuratorService.getBoundlesDataList(selectedItem).subscribe(
      (data) => {
        this.config = data; // Заполнение массива данными из API
      },
      (error) => {
        console.log('Ошибка при получении списка:', error);
      }
    );
   
    return this.config
  }
}
