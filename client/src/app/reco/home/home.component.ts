import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public widgets2:ChartOptions={
    responsive:true,                     
title:{
// responsive: false,
display:true,
text:'FW Contracts Aging',
fontSize:18
},
legend:{
display:true,
position:'right',
labels:{
fontColor:'#000'
}


}
}
  constructor() { }

  ngOnInit() {
  }

}
