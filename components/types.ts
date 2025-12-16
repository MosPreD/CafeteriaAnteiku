export interface Producto {
  id: string;
  tipoCafe: string;
  cantidad: number;
  estado: "pendiente" | "listo";
}

export interface Catalogo {
  id: string;
  nombre: string;
  tipoCafe: string;
  precio: number;
  cantidad: number;
}
