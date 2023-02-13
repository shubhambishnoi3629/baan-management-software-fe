import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaanComponent } from 'src/components/baan/baan.component';
import { BhaaiComponent } from 'src/components/bhaai/bhaai.component';

const routes: Routes = [
  { path: 'bhaai', component: BhaaiComponent},
  { path: 'bhaai/:id/baan', component: BaanComponent},
  { path: '', redirectTo: '/bhaai', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
