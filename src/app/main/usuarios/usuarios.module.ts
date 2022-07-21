import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { ListarComponent } from './listar/listar.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthInterceptor } from 'src/app/services/auth-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    ListarComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    NgxPaginationModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class UsuariosModule { }
