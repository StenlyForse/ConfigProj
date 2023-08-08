import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfiguratorService } from 'src/app/services/configurator.service';

@Component({
  selector: 'app-edit-config-elem',
  templateUrl: './edit-config-elem.component.html',
  styleUrls: ['./edit-config-elem.component.css']
})
export class EditConfigElemComponent {
  bundleId: number = 0;

  constructor(private route: ActivatedRoute, private configuratorService: ConfiguratorService, private router: Router) { }
  configElems: any[] = [];

  ngOnInit(): void {

    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        this.bundleId = id ? parseInt(id, 10) : 0;

        if (id) {
          // вызов api
          this.configuratorService.getBoundlesDataList(parseInt(id, 10)) // тут почему-то не сменилось нормально, пришлось парсить
          .subscribe({
            next: (response) => {
              this.configElems = response;
            },
            error: (response) => {
              console.log(response)
            }
          })
        }
      }
    })
  }

  updateBoundlesDataList() {
    this.configuratorService.updateBoundlesDataList(this.bundleId, this.configElems)
    .subscribe({
      next: (response) => {
        // Возвращаемся назад в список
        //this.router.navigate(['catalog'])
      }
    })
  }
}
