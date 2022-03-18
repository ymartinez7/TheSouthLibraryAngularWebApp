import { Component, OnInit, OnDestroy } from '@angular/core';
import { LibrosService } from '../services/libros.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css'],
})
export class LibrosComponent implements OnInit, OnDestroy {
  libros: any;
  private librosSubscription: Subscription;

  constructor(private librosService: LibrosService) {
    this.libros = [];
  }

  ngOnInit(): void {
    this.libros = this.librosService.obtenerLibros();
    this.librosSubscription = this.librosService.librosSubject.subscribe(() => {
      this.libros = this.librosService.obtenerLibros();
    });
  }

  ngOnDestroy(): void {
    this.librosSubscription.unsubscribe();
  }

  eliminarLibro(libro: string) {}

  guardarLibro(f: any) {
    if (f.valid) {
      this.librosService.agregarLibro(f.value.nombreLibro);
    }
  }
}
