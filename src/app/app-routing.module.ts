import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BhaaiComponent } from 'src/components/bhaai/bhaai.component';

const routes: Routes = [
  { path: 'bhaai', component: BhaaiComponent},
  { path: '', redirectTo: '/bhaai', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
