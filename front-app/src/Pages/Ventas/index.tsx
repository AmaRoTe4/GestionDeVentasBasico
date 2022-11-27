import './styles.css'
import { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import Swal from "sweetalert2"
import axios from 'axios';
import { InterProductos } from "../../../interface"

const pathProductos = 'http://localhost:7890/Productos/' 
interface ProductoAVender{
    nombre:string;
    precio:number;
    cantidad:number;
}

export default function Ventas(){
    const [eleSelc , setEleSelc] = useState<string>("")
    const [cantidad , setCantidad] = useState<number>(1)
    const [total , setTotal] = useState<number[]>([0,0])
    const [prtsPorVender , setPrtsPorVender] = useState<ProductoAVender[]>([])
    const [elementos , setElementos] = useState<InterProductos[]>([])

    useEffect(() => {
        mostrarTodosLosProductos()
    },[])

    const mostrarTodosLosProductos = async() => {
        const aux = await axios.get(pathProductos)
        setElementos(aux.data)
    }

    const limpiar = () => {
        setTotal([0,0])
        setPrtsPorVender([])
    }

    const RealizarVenta = () => {
        limpiar()
    }

    const AgregarProducto = () => {
        if(cantidad === 0 || eleSelc === "") return
        
        let aux:ProductoAVender = prtsPorVender.filter(n => n.nombre === eleSelc)[0]
        
        if(aux !== undefined) aux.cantidad += cantidad
        else{
            aux = {
                nombre: eleSelc,
                precio: precio(eleSelc),
                cantidad: cantidad,
            } 
        }

        let retorno:ProductoAVender[] = prtsPorVender.filter(n => n.nombre !== eleSelc)

        setPrtsPorVender([...retorno, aux])
        setTotal(n => [n[0]+cantidad , n[1]+cantidad*precio(eleSelc)])
        setCantidad(1)
    }

    const BorrarProducto = (id:number) => {
        let aux = prtsPorVender
        let eliminar:ProductoAVender = prtsPorVender.splice(id , 1)[0]
        setPrtsPorVender(aux);
        setTotal(n => 
            [n[0]-eliminar.cantidad,
            n[1]-eliminar.cantidad*eliminar.precio]
        )
    }

    const precio = (obj:string):number => {
        const aux:InterProductos = elementos.filter(n => n.nombre === obj)[0]
        return aux.precio
    }
    
    return (
        <div className="containt100 d-flex flex-column align-items-center">
            <div className="box-desple-ventas centrado flex-column">
                <p>Productos</p>
                <select name="select" value={eleSelc} onChange={(e) => {e.preventDefault(); setEleSelc(e.target.value)}}>
                    {elementos.map((n , i) => 
                        <option key={n.id} value={n.nombre}>
                            {n.nombre}
                        </option>
                    )}
                </select>
            </div>
            <div className="box-cantidad-ventas">
                <label htmlFor="precio">Cantidad</label>
                <input 
                    style={{textAlign: "end"}}
                    value={cantidad} 
                    type="number" 
                    id="precio" 
                    name="precio" 
                    onChange={e => setCantidad(e.target.value !== "" ? parseInt(e.target.value) : 0)} 
                />
            </div>
            <div className="box-agregar-ventas centrado">
                <button type="button" onClick={e => {e.preventDefault(); AgregarProducto()}}>Agregar</button>
            </div>
            <div className="box-table-ventas">
                <Table striped bordered hover>
                    <thead>
                        <tr className='table-dark'>
                            <th>N°</th>
                            <th>Producto</th>
                            <th className="text-end">Cantidad</th>
                            <th className="text-end">Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prtsPorVender.map((n ,i ) => 
                            <tr key={i} onClick={(e) => {e.preventDefault(); 
                            
                                Swal.fire({
                                    title: 'Advertencia!',
                                    text: 'Estas seguro de querer borrar Este Articulo?',
                                    icon: 'warning',
                                    showCloseButton: true,
                                    showCancelButton: true,
                                    confirmButtonText:'Borrar',
                                    cancelButtonText:'Cancelar',
                                }).then((result) => {
                                    if(result.isConfirmed) BorrarProducto(i)
                                })

                            }}>
                                <td>{i+1}</td>
                                <td>{n.nombre}</td>
                                <td className='text-end'>{n.cantidad}</td>
                                <td className='text-end'>${n.cantidad * n.precio}</td>
                            </tr>
                        )}
                        <tr className="table-success">
                            <td>Total</td>
                            <td></td>
                            <td className='text-end'>{total[0]}</td>
                            <td className='text-end'>${total[1]}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <div className="box-bottones-ventas">
                <button 
                    className="btn btn-success" 
                    onClick={e => {e.preventDefault(); RealizarVenta()}}>
                        Realizar Venta
                </button>
                <button 
                    className="btn btn-danger" 
                    onClick={e => {e.preventDefault(); limpiar()}}>
                        Cancelar
                </button>
            </div>
        </div>
    )
}