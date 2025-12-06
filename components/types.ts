export interface Producto {
  id: string;
  tipoCafe: string;
  cantidad: number;
  estado: "pendiente" | "listo";
}