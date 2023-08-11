import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfiguratorService } from 'src/app/services/configurator.service';

@Component({
  selector: 'app-edit-config-elem',
  templateUrl: './edit-config-elem.component.html',
  styleUrls: ['./edit-config-elem.component.css']
})
export class EditConfigElemComponent {
  bundleId: number = 0;

  
  constructor(private route: ActivatedRoute, private configuratorService: ConfiguratorService, private router: Router, private formBuilder: FormBuilder) { }
  configElemsArr: any[] = [];
  configHeader: any = {};
  @Input() form!: FormGroup;
  items: FormArray = new FormArray(this.configElemsArr);

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      items: this.formBuilder.array([]) // Используйте FormArray как часть формы
    });


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
              this.initializeItems();
              this.configHeader = {Title: response.title, DateTime: response.dateTime, Revision: response.revision}
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
    this.configuratorService.updateBoundlesDataList(this.bundleId, this.configElemsArr)
    .subscribe({
      next: (response) => {
        // Возвращаемся назад в список
        //this.router.navigate(['catalog'])
      }
    })
  }

  initializeItems() {
    // Здесь заполните массив items данными из API или другим способом
    // Например:
    this.configElemsArr.forEach(item => this.addItem(item));
  }

  addItem(item: any) {

    const newItemGroup = this.formBuilder.group({
      name: new FormControl(item.name),
      boundleID: new FormControl(item.boundleID),
      count: new FormControl(item.count),
      moduleCount: new FormControl(item.moduleCount)
    });

    (this.form.get('items') as FormArray).push(newItemGroup);
  }
  
}
