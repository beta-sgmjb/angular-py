import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../ojo.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '', children: [
      { path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent },
      { path: 'estudiantes', canActivate: [AuthGuard], loadChildren: () => import('./estudiantes/estudiantes.module').then(m => m.EstudiantesModule) },
      { path: 'usuarios', canActivate: [AuthGuard], loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule) },
      { path: 'empresas', canActivate: [AuthGuard], loadChildren: () => import('./empresas/empresas.module').then(m => m.EmpresasModule) },
      { path: 'supervisores', canActivate: [AuthGuard], loadChildren: () => import('./supervisores/supervisores.module').then(m => m.SupervisoresModule) },
      { path: 'ppps', canActivate: [AuthGuard], loadChildren: () => import('./ppps/ppps.module').then(m => m.PppsModule) },
      { path: 'tipoEmpresas', canActivate: [AuthGuard], loadChildren: () => import('./tipo-empresas/tipo-empresas.module').then(m => m.TipoEmpresasModule) },
      { path: '**', redirectTo: 'dashboard' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }