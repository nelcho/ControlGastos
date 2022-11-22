import { useState, useEffect } from 'react'
import Header from './components/Header'
import Filtros from './components/Filtros'
import ListadoGastos from './components/ListadoGastos'
import Modal from "./components/Modal"
import { generarId } from './helpers'
import IconoNuevoGasto from "./assets/img/nuevo-gasto.svg"

function App() {

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem("presupuesto")) ?? 0
  )
  const [siEsUnPresupuestoValido, setSiEsUnPresupuestoValido] = useState(false)
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  const [gastos, setGastos] = useState(
    localStorage.getItem("gastos") ? JSON.parse(localStorage.getItem("gastos")) : []
  )
  const [editarGasto, setEditarGasto] = useState({})
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect(() => {
    if( Object.keys(editarGasto).length > 0 ) {
        setModal(true)
        setTimeout(() => {
            setAnimarModal(true)
        }, 500);
    }
  }, [editarGasto])

  useEffect(() => {
    localStorage.setItem("presupuesto", presupuesto ?? 0)
  }, [presupuesto])

  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos) ?? [])
  }, [gastos])

  useEffect(() => {
    if(filtro) {
        const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro)
        setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro]);

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem("presupuesto")) ?? 0;
    if(presupuestoLS > 0 ) {
      setSiEsUnPresupuestoValido(true)
    }
  }, []);

  const registrarNuevoGasto = () => {
    setModal(true)
    setEditarGasto({})
    setTimeout(() => {
        setAnimarModal(true)
    }, 500);
  }

  const guardarGasto = gasto => {
    if(gasto.id) {
      const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados);
      setEditarGasto({})
    } else {
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto ])
    }
    setAnimarModal(false)
    setTimeout(() => {
        setModal(false)
    }, 500);
  }

  const eliminarGasto = (id) => {
    const gastosActualizados = gastos.filter( gasto => gasto.id !== id);
    setGastos(gastosActualizados);
  }

  return (
      <div className={modal ? "fijar" : "" }>
        <Header 
            gastos={gastos}
            setGastos={setGastos}
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
            siEsUnPresupuestoValido={siEsUnPresupuestoValido}
            setSiEsUnPresupuestoValido={setSiEsUnPresupuestoValido}
        />

        {siEsUnPresupuestoValido && (
          <>
            <main>
              <Filtros 
                filtro={filtro}
                setFiltro={setFiltro}
              />
              <ListadoGastos 
                  gastos={gastos}
                  setEditarGasto={setEditarGasto}
                  eliminarGasto={eliminarGasto}
                  filtro={filtro}
                  gastosFiltrados={gastosFiltrados}
              />
            </main>
            <div className="nuevo-gasto">
                <img src={IconoNuevoGasto} alt="icono nuevo gasto" onClick={registrarNuevoGasto}/>
            </div>
          </>
        )}

        {modal && <Modal 
                    setModal={setModal}
                    animarModal={animarModal}
                    setAnimarModal={setAnimarModal}
                    guardarGasto={guardarGasto}
                    editarGasto={editarGasto}
                    setEditarGasto={setEditarGasto}
                  />}

      </div>
  )
}

export default App


/*
-- import Header from './components/Header' --

"Con esta linea importamos el componente Header, el cual mostrara en pantalla todo el contenido que se encuentre en ese componente, el index.css le dara formato
al contenido html del mismo a traves de reglas css"
*/
