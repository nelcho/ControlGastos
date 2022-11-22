//Id Unico -- Esta funcion genera un Id unico y sirve para casi todas las aplicaciones
export const generarId = () => {
    const random = Math.random().toString(36).substr(2)
    const fecha = Date.now().toString(36)
    return random + fecha
}

//Formato Fecha --Permite tomar la fecha del sistema sin recurrir a un componente externo y ponerla en un campo de datos
export const formatoFecha = fecha => {
    const nuevaFecha = new Date(fecha);
    const opciones = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    }
    return nuevaFecha.toLocaleDateString('es-ES', opciones)
}

//Formato Moneda -- Permite agregar el simbolo de moneda a un dato
export const formatoMoneda = (cantidad) => {
        return cantidad.toLocaleString("en-US", {
            style: "currency",
            currency: "USD"
         })
    }