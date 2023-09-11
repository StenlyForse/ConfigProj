import { Component } from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';


interface MenuNode {
    name: string;
    // route: string;
    children?: MenuNodeChild[];
  }

interface MenuNodeChild {
    name: string;
    route: string;
}  
  
  const TREE_DATA: MenuNode[] = [
    {
      name: 'Конфигуратор',
      children: [
        {name: 'Новое КП', route: '/'},
        {name: 'Список КП',  route: '/'},
    ],
    },
    {
      name: 'Настойки',
      children: [
        {name: 'Каталог', route: '/'},
        {name: 'Пользователь', route: '/'},
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
    private _transformer = (node: MenuNode, level: number) => {
        return {
          expandable: !!node.children && node.children.length > 0,
          name: node.name,
          level: level,
        };
      };
    
      treeControl = new FlatTreeControl<ExampleFlatNode>(
        node => node.level,
        node => node.expandable,
      );
    
      treeFlattener = new MatTreeFlattener(
        this._transformer,
        node => node.level,
        node => node.expandable,
        node => node.children,
      );
    
      dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    
      constructor() {
        this.dataSource.data = TREE_DATA;
      }
    
      hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
    
}
