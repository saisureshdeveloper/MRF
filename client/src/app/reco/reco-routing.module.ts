import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const  Recoroutes: Routes = [
  // { path: '',
  //   redirectTo: '/Master/dash'
  // },
  // // { path: '**', component: PageNotFoundComponent },
  // { path: 'dash', component: DashboardComponent },

];

@NgModule({
  imports: [RouterModule.forChild(Recoroutes)],
  exports: [RouterModule]
})
export class RecoRoutingModule { }
