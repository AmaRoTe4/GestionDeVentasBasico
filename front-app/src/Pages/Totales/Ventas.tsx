import { useState } from 'react';
import { Table } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import productos from './productos.json'
import './styles.css'

interface ProductoAVender{
    nombre:string;
    precio:number;
    cantidad:number;
}

interface VentasTotales{
    id:number,
    precio:number;
    cantidad:number;
    productos:ProductoAVender[];
}

export default function TotalVentas(){
    const navigate = useNavigate()
    const [ventasTotales , setVentasTotales] = useState<VentasTotales[]>(productos)

    const cantidadTotal = ():number => {
        let aux = 0;
        ventasTotales.map(n => aux += n.cantidad)
        return aux;
    }  
    const precioTotal = ():number => {
        let aux = 0;
        ventasTotales.map(n => aux += n.precio)
        return aux;
    } 

    return (
        <div className="containt100"> 
            <div className="box-table-totales">
                <Table striped bordered hover>
                    <thead>
                        <tr className='table-dark'>
                            <th>N°</th>
                            <th className="text-end">Cantidad</th>
                            <th className="text-end">Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventasTotales.map((n , i) =>  
                            <tr 
                                className="unidad-de-tabla-total-ventas" 
                                key={i} 
                                onClick={(e) => {e.preventDefault(); navigate(`${n.id}`)}}>
                                <td>{n.id}</td>
                                <td className='text-end'>{n.cantidad}</td>
                                <td className='text-end'>${n.precio}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
            <div className="barra-totales-ventas">
                <div className='table-total-ventas'>Totales</div>
                <div className='table-valor-ventas'>{cantidadTotal()}</div>
                <div className='table-valor-ventas'>${precioTotal()}</div>
            </div>
        </div>
    )
}