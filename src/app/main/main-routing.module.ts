import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OjoGuard } from '../ojo.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '', children: [
      { path: 'dashboard', canActivate: [OjoGuard], component: DashboardComponent },
      { path: 'estudiantes', canActivate: [OjoGuard], loadChildren: () => import('./estudiantes/estudiantes.module').then(m => m.EstudiantesModule) },
      { path: '**', redirectTo: 'dashboard' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }