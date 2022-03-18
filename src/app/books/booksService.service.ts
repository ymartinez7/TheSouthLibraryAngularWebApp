import { Book } from './book.model';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PaginationBooks } from './pagination-books.model';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private baseUrl: string;
  private bookEndpoint: string;
  private booksLista: Book[];
  private bookSubjct = new Subject<Book>();

  private bookPagination: PaginationBooks;
  private bookPaginationSubject = new Subject<PaginationBooks>();

  // private booksLista: Book[] = [
  //   {
  //     bookId: 1,
  //     titulo: 'Algoritmica',
  //     descripcion: 'libro basico',
  //     autor: 'Vaxi Drez',
  //     precio: 18,
  //   },
  //   {
  //     bookId: 2,
  //     titulo: 'Angular',
  //     descripcion: 'libro intermedio',
  //     autor: 'Heli Arcila',
  //     precio: 25,
  //   },
  //   {
  //     bookId: 3,
  //     titulo: 'ASP.NET',
  //     descripcion: 'Master',
  //     autor: 'Juan Arevalo',
  //     precio: 30,
  //   },
  //   {
  //     bookId: 4,
  //     titulo: 'Java',
  //     descripcion: 'Agile libro',
  //     autor: 'John Ortiz',
  //     precio: 99,
  //   },
  // ];

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.baseUrl;
    this.bookEndpoint = environment.bookEndpoint;
    this.booksLista = [];
  }

  obtenerBooks(
    libroPorPagina: number,
    paginaActual: number,
    sort: string,
    sortDirection: string,
    filterValue: any
  ): void {
    // con datos harcodeados
    // return this.booksLista.slice();

    const request = {
      pageSize: libroPorPagina,
      page: paginaActual,
      sort,
      sortDirection,
      filterValue,
    };

    this.httpClient
      .post<PaginationBooks>(this.baseUrl + this.bookEndpoint + '/pagination', request)
      .subscribe((response) => {
        this.bookPagination = response;
        this.bookPaginationSubject.next(this.bookPagination);
      });
  }

  obtenerActualListener(): Observable<PaginationBooks> {
    return this.bookPaginationSubject.asObservable();
  }

  guardarLibro(book: Book): void {
    // solo para datos de pruebas
    // this.booksLista.push(book);

    this.httpClient.post(this.baseUrl + this.bookEndpoint, book)
    .subscribe((response) => {
      this.bookSubjct.next(book);
    });

  }

  guardarLibroListener(): any{
    return this.bookSubjct.asObservable();
  }
}
