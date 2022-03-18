import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Autor } from './autor.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AutoresService {
  private baseUrl: string;
  private autorEndpoint: string;
  private autoresLista: Autor[];
  private autorSubject = new Subject<Autor[]>();

  // private autoresLista: Autor[] = [
  //   { autorId: 1, nombre: 'yansel', apellidos: 'Martinez Rodriguez' },
  //   { autorId: 2, nombre: 'Nadia', apellidos: 'Bojko Lovera' },
  //   { autorId: 3, nombre: 'Frank', apellidos: 'Marcano Mejias' },
  //   { autorId: 4, nombre: 'Alejandro', apellidos: 'Miuguerza García' },
  // ];

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.baseUrl;
    this.autorEndpoint = environment.autorEndpoint;
    this.autoresLista = [];
  }

  obtenerAutores() {
    // con datos harcodeados
    // return this.autoresLista.slice();

    this.httpClient.get<Autor[]>(this.baseUrl + this.autorEndpoint)
    .subscribe((response) => {
      this.autoresLista = response;
      this.autorSubject.next([...this.autoresLista]);
    });
  }

  obtenerActualListener(){
    return this.autorSubject.asObservable();
  }

  // guardarAutor(autor: Autor) {
  //   this.autoresLista.push(autor);
  //   this.autorSubject.next(autor);
  // }
}
