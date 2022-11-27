import { useState } from 'react';
import { Table } from 'react-bootstrap';
import { useLocation, useNavigate , } from 'react-router-dom';
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

export default function TotalVentasIndividual(){
    //const navigate = useNavigate()
    const id:number = parseInt(useLocation().pathname.split('/')[3])
    const [ventasTotales] = useState<VentasTotales>(productos.filter(n => n.id === id)[0])

    const cantidadTotal = ():number => {
        let aux = 0;
        ventasTotales.productos.map(n => aux += n.cantidad)
        return aux;
    }  
    const precioTotal = ():number => {
        let aux = 0;
        ventasTotales.productos.map(n => aux += n.precio)
        return aux;
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
                        {ventasTotales.productos.map((n , i) =>  
                            <tr 
                                className="unidad-de-tabla-total-ventas" 
                                key={i} 
                            >
                                <td>{i}</td>
                                <td>{n.nombre}</td>
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