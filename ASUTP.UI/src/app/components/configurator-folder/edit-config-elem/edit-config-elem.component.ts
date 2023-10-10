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
  cpuElemsArr: any[] = [];
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
              this.cpuElemsArr = response.cpuElems;
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
    this.combineFields = {Title: this.configHeader.Title, DateTime: this.configHeader.DateTime, Revision: this.configHeader.Revision, СonfigsElems: this.configElemsArr, CpuElems: this.cpuElemsArr};
    this.configuratorService.updateBoundlesDataList(this.bundleId, this.combineFields)
    .subscribe({
      next: (response) => {
        window.location.reload();
        // Возвращаемся назад в список
        //this.router.navigate(['catalog'])
      }
    })
  }

  PrintTable() {
    
    var titleLabels = document.getElementById("titleLabels")?.outerHTML;
    var element = document.getElementById("KPtable")?.outerHTML;
    var picture = '<img src="../../../assets/img/incomSys.jpg" class="center"/>';

    const html = '<table><tr><th>Header 1</th><th>Header 2</th></tr><tr><td>Data 1</td><td>Data 2</td></tr></table>';
  
    var style = "<style>";
    style = style + ".center {display: block; margin-left: auto; margin-right: auto;}" //центрирование картинки
    style = style + "table {border: solid 1px #bacbe6; border-collapse: collapse;margin: 0;width: 100%;}";
    style = style + "table tr {padding: .15em;}";
    style = style + "thead {display: table-row-group;}"; // Отображение шапки только на первой странице
    style = style + "thead tr {align-items: center;vertical-align: middle; background-color: #cfe2ff; }";
    style = style + ".config-column {display: flex;justify-content: flex-start;flex-direction: column;flex-wrap: wrap;gap: 25px; }"

    style = style + "tr:nth-child(even) {background-color: #f2f2f2;}";
    style = style + "table th,table td {font-size: 1em;padding: 1em;text-align: center; border: solid 1px #bacbe6;}";
    style = style + "</style>";

    var win = window.open('', '', 'height=1200,width=1200');

    win?.document.write('<html><head>');
    win?.document.write('<title>Новое КП</title>');   // <title> FOR PDF HEADER.
    win?.document.write(style);          // ADD STYLE INSIDE THE HEAD TAG.
    win?.document.write('</head>');
    win?.document.write('<body>');
    win?.document.write(picture);
    win?.document.write(titleLabels!); 
    win?.document.write(element!);         // THE TABLE CONTENTS INSIDE THE BODY TAG.
    win?.document.write('</body></html>');
    if (win?.document.title != undefined){
      win.document.title = 'Новое КП';
    }

    win?.document.close(); 	// CLOSE THE CURRENT WINDOW.

    win?.print();    // PRINT THE CONTENTS.
    win!.onfocus = function () { setTimeout(function () { win?.close(); }, 500); } // Print and auto-close window
  }
}
