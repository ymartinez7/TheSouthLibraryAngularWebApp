import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LibrosService {
  librosSubject = new Subject();

  private libros = ['Libro d ematemática', 'libro de quimica', 'espacial'];

  constructor() {}

  obtenerLibros() {
    return [...this.libros];
  }

  agregarLibro(nombreLibro: string) {
    this.libros.push(nombreLibro);
    this.librosSubject.next(this.libros);
  }

  eliminarLibro(nombreLibro: string) {
    this.libros = this.libros.filter((p) => p !== nombreLibro);
    this.librosSubject.next(this.libros);
  }
}
