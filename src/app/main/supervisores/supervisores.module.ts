import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupervisoresRoutingModule } from './supervisores-routing.module';
import { ListarComponent } from './listar/listar.component';


@NgModule({
  declarations: [
    ListarComponent
  ],
  imports: [
    CommonModule,
    SupervisoresRoutingModule
  ]
})
export class SupervisoresModule { }
