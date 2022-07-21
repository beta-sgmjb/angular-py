import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { ListarComponent } from './listar/listar.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    ListarComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    NgxPaginationModule
  ]
})
export class UsuariosModule { }
