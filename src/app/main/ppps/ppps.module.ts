import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PppsRoutingModule } from './ppps-routing.module';
import { ListarComponent } from './listar/listar.component';


@NgModule({
  declarations: [
    ListarComponent
  ],
  imports: [
    CommonModule,
    PppsRoutingModule
  ]
})
export class PppsModule { }
