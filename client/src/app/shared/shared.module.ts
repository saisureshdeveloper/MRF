import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { ERPtableComponent } from './table/erptable/erptable.component';
import { BanktableComponent } from './table/banktable/banktable.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { BarchartComponent } from './chart/barchart/barchart.component';
import { LinechartComponent } from './chart/linechart/linechart.component';
import { PiechartComponent } from './chart/piechart/piechart.component';
import { DoughnutchartComponent } from './chart/doughnutchart/doughnutchart.component';
import { AgGridModule } from 'ag-grid-angular';
import { ChartsModule } from 'ng2-charts';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';
import {MatCardModule} from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatButtonModule, MatStepperModule, MatExpansionModule, MatIconModule } from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { AlertComponent } from './popup/alert/alert.component';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../pipe/filterUnique.pipe';
import { ExpandMenuDirective } from '../pipe/expand-menu.directive';
import { ButtonRendererComponent } from './renderer/editbutton.component';
import { EditTableComponent } from './popup/edit-table/edit-table.component';
import { SummarytableComponent } from './table/summarytable/summarytable.component';
import { BankService } from './table/banktable/bank.service';
import { ERPTabelService } from './table/erptable/erp.service';
import { RolloverpopupComponent } from './popup/rolloverpopup/rolloverpopup.component';
import { ConfirmationpopupComponent } from './popup/confirmationpopup/confirmationpopup.component';


// import { NgScrollbarModule } from 'ngx-scrollbar';
@NgModule({
  imports: [
    // NgScrollbarModule,
    BrowserAnimationsModule,
    ChartsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatButtonModule,
    FormsModule,
    CommonModule,
    MatCardModule,
    SharedRoutingModule,
    MatStepperModule,
    MatExpansionModule,
    MatIconModule,
    // FilterPipe,
    AgGridModule.withComponents([ButtonRendererComponent])
  ],
  declarations: [
    ExpandMenuDirective,
    FilterPipe,
    ERPtableComponent,
    BanktableComponent,
    SidemenuComponent,
    DoughnutchartComponent,
    BarchartComponent,
    LinechartComponent,
    PiechartComponent,
    AlertComponent,
    ButtonRendererComponent,
    EditTableComponent,
    SummarytableComponent,
    RolloverpopupComponent,
    ConfirmationpopupComponent

  ],
  exports: [
    FilterPipe,
     ChartsModule,
    CommonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    ERPtableComponent,
    BanktableComponent,
    SummarytableComponent,
    SidemenuComponent,
    DoughnutchartComponent,
    BarchartComponent,
    LinechartComponent,
    PiechartComponent,

  ],
  providers: [
    BankService,
    ERPTabelService,
    FilterPipe]
  // schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule { }
