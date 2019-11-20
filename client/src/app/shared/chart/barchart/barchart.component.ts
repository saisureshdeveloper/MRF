import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
// import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { RecoService } from 'src/app/services/reco.service';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit {
  @Input() data: any; 
  @Input() options: any; 
  @Input() type: any; 

  @Input() BankName:any;

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  // public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] =  [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];
  /*sampledata
      [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];
  */

  constructor(private _service:RecoService) { }

  ngOnInit() {
    // console.log("bar char ",this.data)
  }
  ngOnChanges() {
 console.log("this.data",this.data)
    // this.barChartLabels=this.data?this.data.label:'';
    this.barChartOptions=this.options;
    this.barChartType=this.type;
      if(this.data)
      {
        let obj:any;
        if(this.BankName)
        {
           obj={
            query:this.data.query+" and relationshipId="+parseFloat(this.BankName)
          }
        }
        else{
           obj={
            query:this.data.query
          }
        }
        
        this._service.gettingQueryValues(obj)
        .subscribe(res=>{
          let obj:any=res;
          this.barChartLabels=obj.label;
          this.barChartData=[{data:obj.data}];
        
        })
      }
   
    
  }
  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    const data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    this.barChartData[0].data = data;
  }

}
