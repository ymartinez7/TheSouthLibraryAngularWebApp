import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { Autor } from 'src/app/autores/autor.model';
import { AutoresService } from 'src/app/autores/autoressService.service';
import { Book } from '../book.model';
import { BooksService } from '../booksService.service';

@Component({
  selector: 'app-book-nuevo',
  templateUrl: './book-nuevo.component.html',
  styleUrls: ['./book-nuevo.component.css'],
})
export class BookNuevoComponent implements OnInit, OnDestroy {
  selectAutor: string;
  selectAutorText: string;
  fechaPublicacion: string;
  private book: Book;
  autores: Autor[];
  @ViewChild(MatDatepicker) picker: MatDatepicker<Date>;

  autorSubscription: Subscription;

  constructor(
    private bookService: BooksService,
    private dialogRef: MatDialog,
    private autoresService: AutoresService
  ) {
    this.autores = [];
  }

  ngOnInit(): void {
    // para datos de prueba
    //this.autores = this.autoresService.obtenerAutores();

    this.autoresService.obtenerAutores();
    this.autorSubscription = this.autoresService
      .obtenerActualListener()
      .subscribe((autores: Autor[]) => {
        this.autores = autores;
      });
  }

  ngOnDestroy(): void {
    this.autorSubscription.unsubscribe();
  }

  selected(e: MatSelectChange) {
    this.selectAutorText = (e.source.selected as MatOption).viewValue;
  }

  guardarLibro(form: NgForm) {
    if (form.valid) {
      this.book = {
        id: null,
        titulo: form.value.titulo,
        descripcion: form.value.descripcion,
        fechaPublicacion: new Date(this.fechaPublicacion),
        precio: parseInt(form.value.precio),
        autor: {
          id: this.selectAutor,
          nombreCompleto: this.selectAutorText,
        },
        // autor: this.selectAutorText,
      };

      this.bookService.guardarLibro(this.book);
      this.autorSubscription = this.bookService
        .guardarLibroListener()
        .subscribe((response) => {
          this.dialogRef.closeAll();
        });
    }
  }
}
