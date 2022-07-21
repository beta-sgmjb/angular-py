import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PppsRoutingModule } from './ppps-routing.module';
import { ListarComponent } from './listar/listar.component';
import { AuthInterceptor } from 'src/app/services/auth-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { PppService } from 'src/app/services/ppp.service';


@NgModule({
  declarations: [
    ListarComponent
  ],
  imports: [
    CommonModule,
    PppsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    PppService
  ]
})
export class PppsModule { }
