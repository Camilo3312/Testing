export function formatPrice(price: any) {
    return new Intl.NumberFormat('es-ES').format(price)
}