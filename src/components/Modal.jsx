import {useState, useEffect} from 'react'
import Mensaje from './Mensaje'
import IconoCerrarModal from "../assets/img/cerrar.svg"

const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto, editarGasto, setEditarGasto}) => {

    const [nombre, setNombre] = useState("")
    const [cantidad, setCantidad] = useState("")
    const [categoria, setCategoria] = useState("")
    const [mensaje, setMensaje] = useState("");
    const [id, setId] = useState("")
    const [fecha, setFecha] = useState("")
    
    useEffect(() => {
        if( Object.keys(editarGasto).length > 0 ) {
            setNombre(editarGasto.nombre)
            setCantidad(editarGasto.cantidad)
            setCategoria(editarGasto.categoria)
            setId(editarGasto.id)
            setFecha(editarGasto.fecha)
        }
    }, []);

    const cerrarModal = () => {
        setAnimarModal(false)
        setEditarGasto({})
        setTimeout(() => {
            setModal(false)
        }, 500);
    }

    const añadirGasto = (evento) => {
        evento.preventDefault();
        if([nombre, cantidad, categoria].includes("")) {
            setMensaje("Todos los Campos son Obligatorios")
            setTimeout(() => {
                setMensaje("")
            }, 1000)
            return
        }
        guardarGasto({nombre, cantidad, categoria, id, fecha})
    }

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img src={IconoCerrarModal} alt="cerrar modal" onClick={cerrarModal}/>
            </div>

            <form className={`formulario ${animarModal ? "animar" : "cerrar"}`} onSubmit={añadirGasto}>
                <legend>{editarGasto.nombre ? "Editar Gasto" : "Nuevo Gasto"}</legend>
                
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

                <div className="campo">
                    <label htmlFor="nombre">Nombre Gasto</label>
                    <input id="nombre" type="text" placeholder="Añada el Nombre del Nuevo Gasto" value={nombre} onChange={(evento) => setNombre(evento.target.value)}/>
                </div>

                <div className="campo">
                    <label htmlFor="cantidad">Cantidad</label>
                    <input id="cantidad" type="number" placeholder="Añada la Cantidad del Nuevo Gasto" value={cantidad} onChange={(evento) => setCantidad(Number(evento.target.value))}/>
                </div>

                <div className="campo">
                    <label htmlFor="categoria">Categoría</label>
                    <select id="categoria" value={categoria} onChange={(evento) => setCategoria(evento.target.value)}>
                        <option value="">-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>

                <input type="submit" value={editarGasto.nombre ? "Guardar Cambios" : "Añadir Gasto"}/>
            </form>
        </div>
    )
}

export default Modal
