import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Book } from './book.model';
import { BooksService } from './booksService.service';
import { BookNuevoComponent } from './book-nuevo/book-nuevo.component';
import { Subscription } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';
import { PaginationBooks } from './pagination-books.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit, AfterViewInit, OnDestroy {
  private books: Book[];
  desplegarColumnas = ['titulo', 'descripcion', 'autor', 'precio'];
  dataSource = new MatTableDataSource<Book>();
  @ViewChild(MatSort) ordenamiento: MatSort;
  @ViewChild(MatPaginator) paginacion: MatPaginator;
  private bookSubscription: Subscription;

  // tabla
  librosPorPagina: number;
  totalLibros: number;
  paginaCombo: number[];
  paginaActual: number;
  sort: string;
  sortDirection: string;
  filterValue: any;

  constructor(private booksService: BooksService, private dialog: MatDialog) {
    this.books = [];

    // tabla
    this.librosPorPagina = 5;
    this.totalLibros = 0;
    this.paginaCombo = [5, 10, 15, 20];
    this.paginaActual = 1;
    this.sort = 'titulo';
    this.sortDirection = 'asc';
    this.filterValue = null;
  }

  ngOnInit(): void {
    // solo para datos harcodeados
    // this.dataSource.data = this.booksService.obtenerBooks();
    // this.bookSubscription = this.booksService.bookSubjct.subscribe(() => {
    //   this.dataSource.data = this.booksService.obtenerBooks();
    // });

    // para consukta rdata real
    this.booksService.obtenerBooks(
      this.librosPorPagina,
      this.paginaActual,
      this.sort,
      this.sortDirection,
      this.filterValue
    );

    this.bookSubscription = this.booksService
      .obtenerActualListener()
      .subscribe((pagination: PaginationBooks) => {
        this.dataSource = new MatTableDataSource<Book>(pagination.data);
        this.totalLibros = pagination.totalRows;
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.ordenamiento;
    this.dataSource.paginator = this.paginacion;
  }

  ngOnDestroy(): void {
    this.bookSubscription.unsubscribe();
  }

  eventoPaginador(e: PageEvent): void {
    this.librosPorPagina = e.pageSize;
    this.paginaActual = e.pageIndex + 1;
    this.booksService.obtenerBooks(
      this.librosPorPagina,
      this.paginaActual,
      this.sort,
      this.sortDirection,
      this.filterValue
    );
  }

  // hacerFiltro(filtro: string) {
  //   this.dataSource.filter = filtro;
  // }

  hacerFiltro(event: any): void {
    const filterValueLocal = {
      property: 'titulo',
      value: event.target.value,
    };

    this.filterValue = filterValueLocal;

    this.booksService.obtenerBooks(
      this.librosPorPagina,
      this.paginaActual,
      this.sort,
      this.sortDirection,
      this.filterValue
    );
  }

  abrirDialogo(): void {
    const dialoRef = this.dialog.open(BookNuevoComponent, {
      width: '550px',
    });

    dialoRef.afterClosed().subscribe(() => {
      this.booksService.obtenerBooks(
        this.librosPorPagina,
        this.paginaActual,
        this.sort,
        this.sortDirection,
        this.filterValue
      );
    });
  }

  ordenarColumna(event: any): void {
    this.sort = event.active;
    this.sortDirection = event.direction;

    this.booksService.obtenerBooks(
      this.librosPorPagina,
      this.paginaActual,
      this.sort,
      this.sortDirection,
      this.filterValue
    );
  }
}
