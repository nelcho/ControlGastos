import { useState, useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"
import { formatoMoneda } from "../helpers/index"

const ControlPresupuesto = ({gastos, setGastos, presupuesto, setPresupuesto, setSiEsUnPresupuestoValido}) => {

    const [porcentaje, setPorcentaje] = useState(0)
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)

    useEffect(() => {
      const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0);
      const totalDisponible = presupuesto - totalGastado;
      const nuevoPorcentaje = ((( presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2);
      setDisponible(totalDisponible)
      setGastado(totalGastado)
      setTimeout(() => {
        setPorcentaje(nuevoPorcentaje)
      }, 500);
    }, [gastos])

    const resetearApp = () => {
        const resultado = confirm("¿Deseas Reiniciar la App?");
        if(resultado) {
            setGastos([])
            setPresupuesto(0)
            setSiEsUnPresupuestoValido(false)
        } 
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                        trailColor: '#F5F5F5',
                        textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                    })}
                    value={porcentaje}
                    text={`${porcentaje}% Gastado`}
                />
            </div>

            <div className="contenido-presupuesto">
                <button className="reset-app" type="button" onClick={resetearApp}>Resetear App</button>
                <p>
                    <span>Presupuesto: </span>{formatoMoneda(presupuesto)}
                </p>

                <p className={`${disponible < 0 ? "negativo" : "" }`}>
                    <span>Disponible: </span>{formatoMoneda(disponible)}
                </p>

                <p>
                    <span>Gastado: </span>{formatoMoneda(gastado)}
                </p>
            </div>
        </div>
    )
}

export default ControlPresupuesto
