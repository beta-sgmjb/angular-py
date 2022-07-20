import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OjoGuard } from './ojo.guard';

const routes: Routes = [
  { path:'', redirectTo: 'sys', pathMatch:'full' },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'sys', canActivate: [OjoGuard], loadChildren: () => import('./main/main.module').then(m => m.MainModule) },
  { path:'**', redirectTo: 'sys' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
