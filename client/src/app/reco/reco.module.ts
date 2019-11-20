import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecoRoutingModule } from './reco-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { OwlModule } from 'ngx-owl-carousel';
import { ChartsModule } from 'ng2-charts';
import { MatButtonModule, MatCheckboxModule, MatCard, MatCardModule, MatExpansionModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { PiechartComponent } from '../shared/chart/piechart/piechart.component';
import { BarchartComponent } from '../shared/chart/barchart/barchart.component';
import { HomeComponent } from './home/home.component';
import { AgGridModule } from 'ag-grid-angular';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { FileUploadModule } from 'ng2-file-upload';

// import { FileUploadModule } from 'ng2-file-upload';

// import { BanktableComponent } from '../commom/table/banktable/banktable.component';
// import { ERPtableComponent } from '../commom/table/erptable/erptable.component';
// import { DoughnutchartComponent } from '../commom/chart/doughnutchart/doughnutchart.component';
// import { BarchartComponent } from '../commom/chart/barchart/barchart.component';
// import { LinechartComponent } from '../commom/chart/linechart/linechart.component';
// import { PiechartComponent } from '../commom/chart/piechart/piechart.component';
// ChartsModule
@NgModule({
  imports: [
    FileUploadModule,
    MatExpansionModule,
    SharedModule,
    FormsModule,
    OwlModule,
    MatCardModule,
    ChartsModule,
    MatButtonModule,
    MatCheckboxModule,
    HttpClientModule,
    CommonModule,
    RecoRoutingModule,
    AgGridModule.withComponents(null)
  ],
  declarations: [DashboardComponent, HomeComponent, FileuploadComponent
   
   ],
     exports: [ChartsModule],
})
export class RecoModule { }
