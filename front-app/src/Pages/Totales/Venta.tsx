import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useLocation, useNavigate , } from 'react-router-dom';
import { ventaId } from '../../functions/https/ventas';
import {InterProductos , InterVentas, ProductoVendido} from '../../../interface'
import './styles.css'
import { mostrarProductoId } from '../../functions/https/Productos';


export default function TotalVentasIndividual(){
    const navigate = useNavigate()
    const id:number = parseInt(useLocation().pathname.split('/')[3])
    const [venta , setVenta] = useState<InterProductos[]>()
    const [precioTotal , setPrecioTotal] = useState<number>(0)
    const [cantidadTotal , setCantidadTotal] = useState<number>(0)

    useEffect(() =>{
        cargaVenta()
    },[])

    const cargaVenta = async () => {
        const aux:InterVentas = await ventaId(id)
        const productos:ProductoVendido[] = JSON.parse(aux.venta)
        const retorno:InterProductos[] = []

        let precio = 0
        let cantidad = 0
        
        if(aux === undefined) return

        for(let i = 0 ; i < productos.length; i++){
            const Producto:InterProductos = await mostrarProductoId(productos[i].id) 
            Producto.vendidos = productos[i].vendidos;
            retorno.push(Producto)
            precio += Producto.precio*productos[i].vendidos;
            cantidad += productos[i].vendidos
        }
        
        setVenta(retorno)
        setPrecioTotal(precio)
        setCantidadTotal(cantidad)     
    }

    return (
        <div className="containt100"> 
            <h1 className="centrado" style={{height:"10vh"}}>Venta N°{id}</h1>
            <div className="box-table-totales individual">
                <Table striped bordered hover>
                    <thead>
                        <tr className='table-dark'>
                            <th>N°</th>
                            <th>Producto</th>
                            <th className="text-end">Cantidad</th>
                            <th className="text-end">Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {venta !== undefined && venta.map((n , i) =>  
                            <tr 
                                className="unidad-de-tabla-total-ventas" 
                                key={i} 
                            >
                                <td>{i}</td>
                                <td>{n.nombre}</td>
                                <td className='text-end'>{n.vendidos}</td>
                                <td className='text-end'>${n.precio}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
            <div className="barra-totales-ventas">
                <div className='table-total-ventas' style={{width:'60%'}}>Totales</div>
                <div className='table-valor-ventas' style={{width:'20%'}}>{cantidadTotal}</div>
                <div className='table-valor-ventas' style={{width:'20%'}}>${precioTotal}</div>
            </div>
        </div>
    )
}