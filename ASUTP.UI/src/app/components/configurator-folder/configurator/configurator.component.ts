import { Component } from '@angular/core';
import { CatalogElem } from 'src/app/models/catalog.model';
import { CatalogService } from 'src/app/services/catalog.service';
import { ConfiguratorService } from 'src/app/services/configurator.service';
import { ConfigElem } from 'src/app/models/config.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configurator',
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.css']
})
export class ConfiguratorComponent {
  controllers: CatalogElem[] = [];
  cpu: CatalogElem[] = [];
  configArr: ConfigElem[] = [];
  cpuArr: ConfigElem[] = [];
  combinedArr: any = {};
  dublicating: boolean = false;

  constructor(private configuratorService: ConfiguratorService, private router: Router) { }

  ngOnInit(): void {

    this.configuratorService.getCatalogK3()
    .subscribe({
      next: (catalog) => {
        this.controllers = catalog.controllers;
        this.cpu = catalog.cpu;
        this.initializeItems();
      },
      error: (response) => {
        console.log(response)
      }
    })
  }

  // Инициализация массива
  initializeItems() {
    for (let i = 0; i < this.controllers.length; i++) {
      this.configArr[i] = {id: 0, catalogId: this.controllers[i].id, name: this.controllers[i].name, inputCount: 0, boundleID: 0, count: 0 };
    }

    for (let i = 0; i < this.cpu.length; i++) {
      this.cpuArr[i] = {id: 0, catalogId: this.cpu[i].id, name: this.cpu[i].name, inputCount: 0, boundleID: 0, count: 1 };
    }
  }

 // При убирании курсора с инпута
  onInputBlur(index: number) {
    if (this.configArr[index].inputCount === undefined) {
      // Если значение в inputCount пусто, устанавливаем значение из placeholder (например, 0)
      this.configArr[index].inputCount = 0;
      this.configArr[index].count = 0;
    }
    // Записываем значение с резервом
    this.configArr[index].count =  this.configArr[index].inputCount + this.configArr[index].inputCount * this.reserveValue;
  }

  // Событие при изменении резерва
  reserveValue: number = 0; // Резерв
  onChangeReserve(event: any): void {
    // Получение по изменению
    this.reserveValue = parseInt(event.target.value)/100;

    // Умножаем всё на резерв 
    for (let i = 0; i < this.configArr.length; i++) {
      this.configArr[i].count =  Math.ceil(this.configArr[i].inputCount + this.configArr[i].inputCount * this.reserveValue);
    }
  }

  addConfig(): void {
    // Проверяем все значения inputCount и устанавливаем значения по умолчанию, если не заполнены
    for (let i = 0; i < this.controllers.length; i++) {
      if (this.configArr[i].inputCount === undefined) {
        // Если значение в inputCount пусто, устанавливаем значение из placeholder (например, 0)
        this.configArr[i].inputCount = 0;
        this.configArr[i].count = 0;
      }
      /*// Расчет количества модулей на фронте
      var parse = this.configArr[i].name?.split(".", 5);
      var moduleCout = Math.ceil(this.configArr[i].count / parseInt(parse![3]));*/
    }

    for (let i = 0; i < this.cpu.length; i++) {
      if (this.cpuArr[i].inputCount === undefined) {
        // Если значение в inputCount пусто, устанавливаем значение из placeholder (например, 0)
        this.cpuArr[i].inputCount = 0;
        this.cpuArr[i].count = 1;
      }
    }
    this.combinedArr = {cpu: this.cpuArr, controllers: this.configArr, dublicatingCPU: this.dublicating}

    this.configuratorService.addConfig(this.combinedArr)
    .subscribe({
      next: (configElem) => {
        alert('Новая конфигурация добавлена, её уникальный номер: ' + configElem);
        this.router.navigate(['configurator/configList/edit/' + configElem])
      },
      error: (response) => {
        console.log(response)
      }
      
    })
    
    console.log(this.configArr);
  }

  onChangeDublicating(event: any): void {
    // Получение по изменению
    if (event.target.value == "true")
    /*for (let i = 0; i < this.cpu.length; i++) {
      this.cpuArr[i].count = 2;
      
    }*/
    this.dublicating = true;
    else
    /*for (let i = 0; i < this.cpu.length; i++) {
      this.cpuArr[i].count = 1;
      
    }*/
    this.dublicating = false;
  }
}
