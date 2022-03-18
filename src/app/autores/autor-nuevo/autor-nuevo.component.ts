import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Autor } from '../autor.model';
import { AutoresService } from '../autoressService.service';

@Component({
  selector: 'app-autor-nuevo',
  templateUrl: './autor-nuevo.component.html',
  styleUrls: ['./autor-nuevo.component.css'],
})
export class AutorNuevoComponent implements OnInit {
  private autor: Autor;

  constructor(
    private autoresService: AutoresService,
    private dialogRef: MatDialog
  ) {}

  ngOnInit(): void {

  }

  guardarAutor(form: NgForm){
    if(form.valid){
      this.autor = {
        id:'8',
        nombre:form.value.nombre,
        apellido: form.value.apellido,
      };

      // this.autoresService.guardarAutor(this.autor);
      this.dialogRef.closeAll();
    }
  }
}
