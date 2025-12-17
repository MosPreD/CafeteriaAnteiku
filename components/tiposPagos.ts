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
    async procesarPago(pago: Pago): Promise<boolean> {
        if (!pago.cantidad || pago.cantidad <= 0) {
            return false;
        }

        switch (pago.metodo) {
            case MetodoPago.TARJETA:
                return await this.procesarTarjeta(pago);
            case MetodoPago.EFECTIVO:
                return await this.procesarEfectivo(pago);
            case MetodoPago.PAYPAL:
                return await this.procesarPaypal(pago);
            case MetodoPago.TRANSFERENCIA:
                return await this.procesarTransferencia(pago);
            default:
                return false;
        }
    }

    private async procesarTarjeta(pago: Pago): Promise<boolean> {
        return await this.randomizador(pago);
    }

    private async procesarEfectivo(pago: Pago): Promise<boolean> {
        return await this.randomizador(pago);
    }

    private async procesarPaypal(pago: Pago): Promise<boolean> {
        return await this.randomizador(pago);
    }

    private async procesarTransferencia(pago: Pago): Promise<boolean> {
        return await this.randomizador(pago);
    }

    private async randomizador(pago: Pago): Promise<boolean> {
        try {
            console.log('Conectando con pasarela de pago...');
            
            await new Promise(resolve => setTimeout(resolve, 5000));
            
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