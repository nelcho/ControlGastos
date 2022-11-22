import { useState } from 'react'
import Mensaje from './Mensaje'

const NuevoPresupuesto = ({presupuesto, setPresupuesto, setSiEsUnPresupuestoValido}) => {

    const [mensaje, setMensaje] = useState('')

    const validarPresupuesto = (evento) => {
        evento.preventDefault();
        if(!presupuesto || presupuesto < 0) {
            setMensaje("No es un Presupuesto Válido")
            return
        } 
        setMensaje("")
        setSiEsUnPresupuestoValido(true)
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra">
            
            <form className="formulario" onSubmit={validarPresupuesto}>
                <div className="campo">
                    <label>Definir Presupuesto</label>
                    <input className="nuevo-presupuesto" type="number" placeholder="Añade tu Presupuesto" value={presupuesto} onChange={(evento) => setPresupuesto(Number(evento.target.value))}/>
                </div>

                <input type="submit" value="Añadir" />

                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
            </form>
        </div>
    )
}

export default NuevoPresupuesto
