import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  rol = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login(form: any): void {
    this.authService.login(form.value).subscribe(res => {
      console.log(res);
      
      this.router.navigateByUrl('/login'); //REDIRECCIONAR
    }, err => {
      console.log(err);
    });
  }
}
