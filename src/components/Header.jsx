import NuevoPresupuesto from "./NuevoPresupuesto"
import ControlPresupuesto from "./ControlPresupuesto"

const Header = ({gastos, setGastos, presupuesto, setPresupuesto, siEsUnPresupuestoValido, setSiEsUnPresupuestoValido}) => {
    
    return (
        <header>
            <h1>Planificador de Gastos</h1>

            {siEsUnPresupuestoValido ? (
                <ControlPresupuesto 
                    gastos={gastos}
                    setGastos={setGastos}
                    presupuesto={presupuesto}
                    setPresupuesto={setPresupuesto}
                    setSiEsUnPresupuestoValido={setSiEsUnPresupuestoValido}
                />
            ) : (
                <NuevoPresupuesto 
                    presupuesto={presupuesto}
                    setPresupuesto={setPresupuesto}
                    setSiEsUnPresupuestoValido={setSiEsUnPresupuestoValido}
                />
            )}

        </header>
    )
}

export default Header
