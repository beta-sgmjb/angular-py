import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signupForm: FormGroup;
  alertError = false;
  error = "";
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.signupForm = this.fb.group({
      name: [''],
      email: [''],
      mobile: [''],
      password: [''],
      passwordA: ['']
    });
  }
  ngOnInit() {}
  
  registerUser() {
    if (this.signupForm.value.passwordA === "admin123456") {
      this.authService.signUp(this.signupForm.value).subscribe((res) => {
        if (res.result) {
          this.signupForm.reset();
          this.router.navigate(['sys/dashboard']);
        }
      });
    } else {
      this.alertError = true;
      this.error = "La contraseña del admin está incorrecta...";
    }
  }
}
