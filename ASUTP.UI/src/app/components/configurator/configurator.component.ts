import { Component } from '@angular/core';
import { CatalogElem } from 'src/app/models/catalog.model';
// import { CatalogService } from 'src/app/services/catalog.service';
import { ConfiguratorService } from 'src/app/services/configurator.service';

@Component({
  selector: 'app-configurator',
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.css']
})
export class ConfiguratorComponent {
  catalog: CatalogElem[] = [];

  constructor(private catalogService: ConfiguratorService) { }

  ngOnInit(): void {
    this.catalogService.getCatalogK3()
    .subscribe({
      next: (catalog) => {
        this.catalog = catalog;
      },
      error: (response) => {
        console.log(response)
      }
    })

  }

}
