import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  usuario: any | Object = {};
  rol = "";
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.usuario = this.auth.getTokenD(this.auth.getToken())
    this.rol = this.usuario['rol'];
    console.log(this.rol);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['auth/login']);
  }
}
