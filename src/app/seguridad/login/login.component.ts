import { Component, OnInit } from '@angular/core';
import { SeguridadService } from '../seguridad.service';
import { LoginData } from '../login-data.model';
import { from } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  private loginData: LoginData;

  constructor(private seguridadService: SeguridadService) {}

  ngOnInit(): void {}

  loginUsuario(form: NgForm) {
    this.loginData = {
      email: form.value.email,
      password: form.value.password,
    };

    this.seguridadService.login(this.loginData);
  }
}
