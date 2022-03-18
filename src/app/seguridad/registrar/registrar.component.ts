import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SeguridadService } from '../seguridad.service';
import { Usuario } from '../usuario.model';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
private usuario: Usuario;

  constructor(private seguridadService: SeguridadService) { }

  ngOnInit(): void {
  }

  registrarUsuario(form: NgForm){
    this.usuario={
      nombre:form.value.nombre,
      apellido: form.value.apellidos,
      username: form.value.username,
      email: form.value.email,
      password: form.value.password,
      usarioId:'',
      token:''
    };

    this.seguridadService.registrarUsuario(this.usuario);
  }

}
