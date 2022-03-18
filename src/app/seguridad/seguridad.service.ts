import { Injectable } from '@angular/core';
import { Usuario } from './usuario.model';
import { LoginData } from './login-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SeguridadService {
  private usuario: Usuario;
  private baseUrl: string;
  private loginEndpoint: string;
  private registroEndpoint: string;
  private _token: string;

  seguridadCambio = new Subject<boolean>();

  public get token(): string {
    return this._token;
  }
  public set token(value: string) {
    this._token = value;
  }

  constructor(private router: Router, private httpClient: HttpClient) {
    this.baseUrl = environment.baseUrl;
    this.registroEndpoint = environment.registroEndpoint;
    this.loginEndpoint = environment.loginEndpoint;
  }

  // Método para sustituir el uso de las porpeidades
  // obtenerToken(): string{
  //   return this.token;
  // }

  // Se ejecuta cuando de inicia la app o se refresca
  cargarUsuario(): void {
    const tokenBrowser = localStorage.getItem('token');

    if (!tokenBrowser) {
      return;
    }

    this.token = tokenBrowser;
    this.seguridadCambio.next(true);

    this.httpClient
      .get<Usuario>(this.baseUrl + '/usuario')
      .subscribe((response) => {
        this.token = response.token;

        this.usuario = {
          email: response.email,
          nombre: response.nombre,
          apellido: response.apellido,
          username: response.username,
          usarioId: response.usarioId,
          password: '',
          token: response.token,
        };

        this.seguridadCambio.next(true);
        localStorage.setItem('token', response.token);
      });
  }

  registrarUsuario(usuario: Usuario): void {
    // this.usuario = {
    //   email: usr.email,
    //   usarioId: Math.round(Math.random() * 10000).toString(),
    //   nombre: usr.nombre,
    //   apellidos: usr.apellidos,
    //   username: usr.username,
    //   password: '',
    //   token: '',
    // };

    // this.seguridadCambio.next(true);
    // this.router.navigate(['/']);

    var usr = {
      email: usuario.email,
      usarioId: Math.round(Math.random() * 10000).toString(),
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      username: usuario.username,
      password: usuario.password,
      token: '',
    };

    this.httpClient
      .post<Usuario>(this.baseUrl + this.registroEndpoint, usr)
      .subscribe((response) => {
        this.token = response.token;

        this.usuario = {
          email: response.email,
          nombre: response.nombre,
          apellido: response.apellido,
          username: response.username,
          usarioId: response.usarioId,
          password: '',
          token: response.token,
        };

        this.seguridadCambio.next(true);

        localStorage.setItem('token', response.token);

        this.router.navigate(['/']);
      });
  }

  login(loginData: LoginData): void {
    var usr = {
      email: loginData.email,
      password: loginData.password,
    };

    this.httpClient
      .post<Usuario>(this.baseUrl + this.loginEndpoint, usr)
      .subscribe((response) => {
        this.token = response.token;

        this.usuario = {
          email: response.email,
          nombre: response.nombre,
          apellido: response.apellido,
          username: response.username,
          usarioId: response.usarioId,
          password: '',
          token: response.token,
        };

        this.seguridadCambio.next(true);

        localStorage.setItem('token', response.token);

        this.router.navigate(['/']);
      });
  }

  salirSesion() {
    this.usuario = null;

    this.seguridadCambio.next(false);

    localStorage.removeItem('token');

    this.router.navigate(['/login']);
  }

  obtenerUsuario() {
    return { ...this.usuario };
  }

  onSesion(): boolean {
    return this.token != null;
  }
}
