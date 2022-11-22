// Este componente permite pasar un mensaje personalizado según el tipo de error

const Mensaje = ({children, tipo}) => {
    return (
        <div className={`alerta ${tipo}`}>{children}</div>
    )
}

export default Mensaje
