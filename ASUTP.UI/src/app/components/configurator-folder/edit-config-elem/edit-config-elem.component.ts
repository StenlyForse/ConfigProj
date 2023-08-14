import { Component, Input } from '@angular/core';
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
  configElemsArr: any[] = [];
  configHeader: any = {};
  configTotals: any = {};
  combineFields: any = {};
  public trigger: number = 0;

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
              this.configElemsArr = response.сonfigsElems;
              this.configHeader = {Title: response.title, DateTime: response.dateTime, Revision: response.revision}
              this.configTotals = {Total: response.total, PureNDS: response.pureNDS, TotalWithNDS: response.totalWithNDS}
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
    this.combineFields = {Title: this.configHeader.Title, DateTime: this.configHeader.DateTime, Revision: this.configHeader.Revision, СonfigsElems: this.configElemsArr};
    this.configuratorService.updateBoundlesDataList(this.bundleId, this.combineFields)
    .subscribe({
      next: (response) => {
        window.location.reload();
        // Возвращаемся назад в список
        //this.router.navigate(['catalog'])
      }
    })
  }
}
