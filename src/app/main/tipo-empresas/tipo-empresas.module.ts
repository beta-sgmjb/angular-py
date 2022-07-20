import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoEmpresasRoutingModule } from './tipo-empresas-routing.module';
import { ListarComponent } from './listar/listar.component';


@NgModule({
  declarations: [
    ListarComponent
  ],
  imports: [
    CommonModule,
    TipoEmpresasRoutingModule
  ]
})
export class TipoEmpresasModule { }
