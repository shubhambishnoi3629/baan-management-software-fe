import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from 'src/components/auth/auth.component';
import { BaanComponent } from 'src/components/baan/baan.component';
import { BhaaiComponent } from 'src/components/bhaai/bhaai.component';
import { AuthGuard } from 'src/services/auth.guard';

const routes: Routes = [
  { path: 'login', component: AuthComponent},
  { path: 'bhaai', component: BhaaiComponent, canActivate: [AuthGuard]},
  { path: 'bhaai/:id/baan', component: BaanComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: '/bhaai', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
