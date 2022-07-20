import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if(this.authService.getToken()) {
      this.router.navigate(['sys/dashboard']).then(() => {
        window.location.reload();
      });
    }
  }

  registrar(form: any): void {
    form.value.rol = "estudiante";
    this.authService.register(form.value).subscribe(res => {
      this.router.navigateByUrl('/sys/dashboard').then(() => {
        window.location.reload();
      });
    })
  }
}
