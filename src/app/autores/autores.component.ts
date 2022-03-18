import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AutorNuevoComponent } from './autor-nuevo/autor-nuevo.component';
import { Autor } from './autor.model';
import { AutoresService } from './autoressService.service';

@Component({
  selector: 'app-autores',
  templateUrl: './autores.component.html',
  styleUrls: ['./autores.component.css'],
})
export class AutoresComponent implements OnInit, AfterViewInit, OnDestroy {
  private autores: Autor[];
  desplegarcolumnas = ['nombre', 'apellido'];
  dataSource = new MatTableDataSource<Autor>();
  @ViewChild(MatSort) ordenamiento: MatSort;
  @ViewChild(MatPaginator) paginacion: MatPaginator;
  private autorSubscription: Subscription;

  constructor(
    private autoresService: AutoresService,
    private dialog: MatDialog
  ) {
    this.autores = [];
  }

  ngOnInit(): void {
    // CODIGO PARA DATOS QUEMADOS DE PRUEBAS
    // this.dataSource.data = this.autoresService.obtenerAutores();
    // this.autorSubscription = this.autoresService.autorSubject.subscribe(() => {
    //   this.dataSource.data = this.autoresService.obtenerAutores();
    // });

    // CODIGO PARA DATOS REALES
    this.autoresService.obtenerAutores();
    this.autorSubscription = this.autoresService
      .obtenerActualListener()
      .subscribe((autores: Autor[]) => {
        this.dataSource.data = autores;
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.ordenamiento;
    this.dataSource.paginator = this.paginacion;
  }

  ngOnDestroy(): void {
    this.autorSubscription.unsubscribe();
  }

  hacerFiltro(filtro: string) {
    this.dataSource.filter = filtro;
  }

  abrirDialogo() {
    this.dialog.open(AutorNuevoComponent, {
      width: '350px',
    });
  }
}
