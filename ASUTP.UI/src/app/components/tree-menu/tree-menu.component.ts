import { Component } from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource, MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';


interface MenuNode {
    name: string;
    route?: string;
    children?: MenuNode[];
  }

interface MenuNodeChild {
    name: string;
    route: string;
}  
  
  const TREE_DATA: MenuNode[] = [
    {
      name: 'Конфигуратор',
      children: [
        {name: 'Новое КП', route: '/configurator'},
        {name: 'Список КП',  route: '/configurator/configList'},
    ],
    },
    {
      name: 'Настойки',
      children: [
        {name: 'Каталог', route: '/catalog'},
        {name: 'Добавить в каталог', route: '/catalog/add'},
      ],
    },
  ];
  
  /** Flat node with expandable and level information */
  interface ExampleFlatNode {
    expandable: boolean;
    name: string;
    level: number;
  }


@Component({
  selector: 'app-tree-menu',
  templateUrl: './tree-menu.component.html',
  styleUrls: ['./tree-menu.component.css'],
  standalone: true,
  imports: [MatTreeModule, MatButtonModule, MatIconModule],
})
export class TreeMenuComponent {
    treeControl = new NestedTreeControl<MenuNode>(node => node.children);
    dataSource = new MatTreeNestedDataSource<MenuNode>();

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (index: number, node: MenuNode) => !!node.children && node.children.length > 0;
    
}
