import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainOuterComponent } from './main-outer/main-outer.component';

const routes: Routes = [
  {
    path: 'main',
    component: MainOuterComponent,
  },
  {
    path: '**',
    redirectTo: 'main',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
