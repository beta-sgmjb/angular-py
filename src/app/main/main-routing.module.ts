import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OjoGuard } from '../ojo.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '', children: [
      { path: 'dashboard', canActivate: [OjoGuard], component: DashboardComponent },
      { path: 'estudiantes', canActivate: [OjoGuard], loadChildren: () => import('./estudiantes/estudiantes.module').then(m => m.EstudiantesModule) },
      { path: 'empresas', canActivate: [OjoGuard], loadChildren: () => import('./empresas/empresas.module').then(m => m.EmpresasModule) },
      { path: 'supervisores', canActivate: [OjoGuard], loadChildren: () => import('./supervisores/supervisores.module').then(m => m.SupervisoresModule) },
      { path: 'ppps', canActivate: [OjoGuard], loadChildren: () => import('./ppps/ppps.module').then(m => m.PppsModule) },
      { path: 'tipoEmpresas', canActivate: [OjoGuard], loadChildren: () => import('./tipo-empresas/tipo-empresas.module').then(m => m.TipoEmpresasModule) },
      { path: '**', redirectTo: 'dashboard' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }