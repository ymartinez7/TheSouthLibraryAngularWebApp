export interface Book {
  id: string;
  titulo: string;
  descripcion: string;
  precio: number;
  fechaPublicacion?: Date;
  autor: {
    id: string,
    nombreCompleto: string
  };
}
