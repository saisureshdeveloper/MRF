import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from  '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
// import { SidemenuComponent } from './commom/sidemenu/sidemenu.component';
import { LandingComponent } from './landing/landing.component';
import { RouterModule, Routes } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AuthGuard } from './_guards/auth.guard';
import {MatButtonModule, MatCheckboxModule, MatCardModule, MatFormFieldModule, MatInputModule, MatDialogModule} from '@angular/material';
import { OwlModule } from 'ngx-owl-carousel';
import { ChartsModule } from 'ng2-charts';
// import { PiechartComponent } from './commom/chart/piechart/piechart.component';
// import { LinechartComponent } from './commom/chart/linechart/linechart.component';
// import { BarchartComponent } from './commom/chart/barchart/barchart.component';
// import { DoughnutchartComponent } from './commom/chart/doughnutchart/doughnutchart.component';
// import { ERPtableComponent } from './commom/table/erptable/erptable.component';
// import { BanktableComponent } from './commom/table/banktable/banktable.component';
import { ErrorInterceptor } from './_helpers/error.interceptor';
// import { AgGridModule } from 'ag-grid-angular';
import { AgGridModule } from 'ag-grid-angular';


import { DashboardComponent } from './reco/dashboard/dashboard.component';
import { RecoModule } from './reco/reco.module';
import { SharedModule } from './shared/shared.module';
import { SidemenuComponent } from './shared/sidemenu/sidemenu.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { AlertComponent } from './shared/popup/alert/alert.component';
import { HomeComponent } from './reco/home/home.component';
import { JwtModule } from '@auth0/angular-jwt';
// import { NgScrollbarModule } from 'ngx-scrollbar';
import {MatStepperModule} from '@angular/material/stepper';
import { EditTableComponent } from './shared/popup/edit-table/edit-table.component';
import { FileuploadComponent } from './reco/fileupload/fileupload.component';
//import the file uploader plugin

import { FileUploadModule } from 'ng2-file-upload';
import { BankService } from './shared/table/banktable/bank.service';
import { ERPTabelService } from './shared/table/erptable/erp.service';
import { RolloverpopupComponent } from './shared/popup/rolloverpopup/rolloverpopup.component';
import { ConfirmationpopupComponent } from './shared/popup/confirmationpopup/confirmationpopup.component';

const appRoutes: Routes = [{
    path: 'main',
    component: SidemenuComponent,
    canActivate: [AuthGuard],
    data: { 
      expectedRole: 'RECO_ADMIN'
    } ,

    children: [
      // {path: '', redirectTo: 'tracks'}, 
      {
        path: 'FWC',
        canActivate: [AuthGuard],
        data: { 
          expectedRole: 'RECO_ADMIN'
        } ,
        //  component: DashboardComponent,
        children: [
          {
            path: 'HOME',
            component: HomeComponent,
            canActivate: [AuthGuard],
            data: { 
              expectedRole: 'RECO_ADMIN'
            } 
          },
          {
            path: 'DHBD',
            component: DashboardComponent,
            canActivate: [AuthGuard],
            data: { 
              expectedRole: 'RECO_ADMIN'
            } 
          },
          {
            path: 'FLUP',
            component: FileuploadComponent,
            canActivate: [AuthGuard],
            data: { 
              expectedRole: 'RECO_ADMIN'
            } 
          },
          

          {
            path: '',
            redirectTo: 'DHBD',
            pathMatch: "full"
          }
        ]
        // loadChildren:'./reco/reco.module#Recoroutes'
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  // { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    // SidemenuComponent,
    LandingComponent,
    // PiechartComponent,
    // LinechartComponent,
    // BarchartComponent,
    // DoughnutchartComponent,
    // ERPtableComponent,
    // BanktableComponent
  ],
  imports: [
    MatStepperModule,
    FileUploadModule,
    JwtModule,
    RecoModule,
    SharedModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatPaginatorModule,
    BrowserModule,
    FormsModule,
    OwlModule,
    MatCardModule,
    ChartsModule,
    MatButtonModule,
     MatCheckboxModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // AgGridModule.withComponents(null),
    RouterModule.forRoot(appRoutes, { useHash: true, enableTracing: false }),
    AgGridModule.withComponents([])
  ],
  exports: [ ChartsModule,MatPaginatorModule,MatDatepickerModule],
  entryComponents: [AlertComponent,EditTableComponent,RolloverpopupComponent,ConfirmationpopupComponent],
  providers: [
    AuthGuard,
    BankService,
    ERPTabelService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  // schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
