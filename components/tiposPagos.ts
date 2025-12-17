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
            case MetodoPago.PAYPAL:
                return this.procesarPaypal(pago);
            case MetodoPago.TRANSFERENCIA:
                return this.procesarTransferencia(pago);
            default:
                return false;
        }
    }

    private procesarTarjeta(pago: Pago): boolean {
        return this.randomizador(pago);
    }

    private procesarEfectivo(pago: Pago): boolean {
        return this.randomizador(pago);
    }

    private procesarPaypal(pago: Pago): boolean {
        return this.randomizador(pago);
    }

    private procesarTransferencia(pago: Pago): boolean {
        return this.randomizador(pago);
    }

    private randomizador(pago: Pago): boolean {
        try {
        console.log('Conectando con pasarela de pago...');

        const aprobado = Math.random() > 0.7;

        if (!aprobado) {
            pago.status = 'fallido';
            return false;
        }

        pago.status = 'completado';
        return true;
    } catch (error) {
        pago.status = 'fallido';
        return false;
        }
    }
}