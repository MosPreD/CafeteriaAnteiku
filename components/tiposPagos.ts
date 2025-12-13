export enum MetodoPago {
    TARJETA= 'tarjeta',
    EFECTIVO = 'efectivo',
    PAYPAL = 'paypal',
    TRANSFERENCIA = 'transferencia',
}

export interface Pago {
    id: string;
    metodo: MetodoPago;
    cantidad: number;
    fecha: Date;
    status: 'pendiente' | 'completado' | 'fallido';
}

export class ServicioPago {
    procesarPago(pago: Pago): boolean {
        if (!pago.cantidad || pago.cantidad <= 0) {
            return false;
        }

        switch (pago.metodo) {
            case MetodoPago.TARJETA:
                return this.procesarTarjeta(pago);
            case MetodoPago.EFECTIVO:
                return this.procesarEfectivo(pago);
            default:
                return false;
        }
    }

    private procesarTarjeta(pago: Pago): boolean {
        
        return true;
    }

    private procesarEfectivo(pago: Pago): boolean {

        return true;
    }
}