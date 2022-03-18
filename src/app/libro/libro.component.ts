import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { LibrosService } from '../services/libros.service';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css'],
})
export class LibroComponent implements OnInit {
  @Input() tituloLibro: string;
  @Output() libroClicked = new EventEmitter();

  constructor(private librosService: LibrosService) {

  }

  ngOnInit(): void {}

  onClicked() {
    // this.libroClicked.emit(); --> se usaba para elevar el evento

    this.librosService.eliminarLibro(this.tituloLibro);
  }
}
