import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/ojo.guard';
import { ListarComponent } from './listar/listar.component';

const routes: Routes = [
  { path: '', children: [
    { path: 'listar', canActivate: [AuthGuard], component: ListarComponent },
    { path: '**', redirectTo: 'listar' }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
