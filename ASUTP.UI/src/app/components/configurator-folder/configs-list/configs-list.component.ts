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
  items: any[] = [];
  config: any[] = [];
  dtOptions: DataTables.Settings = {};

  ngOnInit(): void {

    this.configuratorService.getBoundlesList().subscribe(
      (dat) => {
        this.items = dat; // Заполнение массива данными из API
        for (let i = 0; i < this.items.length; i++) {
          this.items[i].dateTimeKP = new Date(this.items[i].dateTimeKP).toLocaleString("ru-RU")
        }
      },
      (error) => {
        console.log('Ошибка при получении списка:', error);
      }
    );
    this.dtOptions = {
        // pagingType: 'full_numbers',
        language: {
                url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/ru.json',
        },
      };
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
    this.configuratorService.getBoundlesDataList(parseInt(selectedItem, 10)).subscribe(
      (data) => {
        this.config = data; // Заполнение массива данными из API
      },
      (error) => {
        console.log('Ошибка при получении списка конфигураций по Id:', error);
      }
    );
   
    return this.config
  }
}
