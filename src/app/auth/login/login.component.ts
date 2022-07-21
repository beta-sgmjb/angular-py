import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  alertError = false;
  error = "";
  signinForm: FormGroup;
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.signinForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }
  ngOnInit() {}
  
  loginUser() {
    this.authService.signIn(this.signinForm.value).subscribe(res => {
      console.log(res);
      
      this.authService.saveToken(res.dataUsuario.token);
      this.router.navigate(['sys/dashboard'])
      .then(() => {
        window.location.reload();
      });
    }, err => {
      console.log(err.error.msg);
      this.alertError = true;
      this.error = err.error.msg;
    });
  }
}