import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {todasVentas} from '../../functions/https/ventas'
import { InterVentas , InterProductos  , ProductoVendido } from '../../../interface';
import './styles.css'
import { valoresAbsolutosPorVenta } from '../../functions/data';

export default function TotalVentas(){
    const navigate = useNavigate()
    const [ventas , setVentas] = useState<InterVentas[]>([])
    const [precioTotal , setPrecioTotal] = useState<number>(0)
    const [cantidadTotal , setCantidadTotal] = useState<number>(0)

    useEffect(() =>{
        cargaVentas()
    },[])

    const cargaVentas = async () => {
        const aux:InterVentas[] = await todasVentas();
        const retorno = await valoresAbsolutosPorVenta(aux)

        let precio = 0
        let cantidad = 0
        retorno.map(n => precio += n.precio ? n.precio : 0)
        retorno.map(n => cantidad += n.cantidad ? n.cantidad : 0)

        setVentas(retorno)
        setPrecioTotal(precio)
        setCantidadTotal(cantidad)
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
                        {ventas.length > 0 && 
                        ventas.map((n , i) =>  
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
                <div className='table-valor-ventas'>{cantidadTotal}</div>
                <div className='table-valor-ventas'>${precioTotal}</div>
            </div>
        </div>
    )
}