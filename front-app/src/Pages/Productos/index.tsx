import './styles.css'
import {useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { InterProductos } from '../../../interface'
import {eliminarProducto , mostrarTodosLosProductos } from '../../functions/https/Productos/index'
import Swal from 'sweetalert2'

export default function Productos(){
    const [element, setElement] = useState<InterProductos[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        cargaDeElementos()
    },[element])

    const cargaDeElementos = async() => {
        const aux = await mostrarTodosLosProductos()
        setElement(aux)
    }

    return (
        <div className="container containt100 centrado flex-column">
            <div className="centrado box-titulo-productos">
                <h1>Productos</h1>
            </div>
            <ul className="box-productos row d-flex justify-content-center">
                {element.length > 0 && element.map((n) =>
                    <div
                        key={n.id} 
                        className="body-productos centrado flex-column col-md-2 col-5" 
                        onClick={e => {e.preventDefault(); 
                            Swal.fire({
                                text: 'Seleciona la Accion a realizar',
                                icon: 'warning',
                                showCloseButton: true,
                                showCancelButton: true,
                                confirmButtonText:'Borrar',
                                cancelButtonText:'Editar',
                            }).then((result) => {
                                if(result.isConfirmed) eliminarProducto(n.id)
                                //@ts-ignore
                                else if(result.dismiss === 'cancel') navigate(`Acciones/${n.id}`)
                            })
                        }}
                    >
                        <p className="m-1 text-center">{n.nombre}</p>
                        <p className="m-1 text-center">${n.precio}</p>
                    </div>
                )}
                <Link to='Acciones/0' className="body-productos centrado col-md-2 col-5">
                    <i className="fa-solid fa-plus"></i>
                </Link>
            </ul>
        </div>
    )
}
