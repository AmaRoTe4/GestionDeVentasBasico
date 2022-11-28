import './styles.css'
import { Link } from "react-router-dom";
import { useState } from 'react'
import { Table } from 'react-bootstrap';
import {} from "../../../interface"

export default function Totales(){
    //const [TotalesProducto , setTotalesProducto] = useState<ProductoTotales[]>([])
    //const [productos , setProductos] = useState<ProductoTotales[]>([])
    
    //const cantidadTotal = ():number => {
    //    let aux = 0;
    //    TotalesProducto.map(n => aux += n.cantidad)
    //    return aux;
    //}  
    //const precioTotal = ():number => {
    //    let aux = 0;
    //    TotalesProducto.map(n => aux += n.precio)
    //    return aux;
    //} 

    //const mostrarTotales = (nombre:string) => {
    //    if(nombre === 'Productos individuales') setTotalesProducto([]);
    //    else if(nombre === 'Todos') setTotalesProducto([...productos]);
    //    else {
    //        setTotalesProducto([productos.filter(n => n.nombre === nombre)[0]])
    //    }
    //}

    return (
        <div className="containt100 d-flex flex-column">
            <div className="box-links-totales flex-column centrado">
                <Link className="btn-Links-totales centrado" to="ventas">
                    <button className="btn">
                        Ventas
                    </button>
                </Link>
                {/*<select 
                    className="btn-Links-totales centrado" 
                    onChange={e => {e.preventDefault(); mostrarTotales(e.target.value)}}>
                    {productos.map((n , i)=> 
                        <option key={i} >    
                            {n.nombre}
                        </option>
                    )}
                </select>*/}
            </div>
            {/*{TotalesProducto.length !== 0 && 
            <div className="box-table-totales-producto">
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
                        {TotalesProducto.map((n , i) => (n.nombre !== 'Productos individuales' && n.nombre !== 'Todos') ?  
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{n.nombre}</td>
                                <td className='text-end'>{n.cantidad}</td>
                                <td className='text-end'>${n.precio}</td>
                            </tr> : ""
                        )}
                        <tr>
                            <td>Totales</td>
                            <td></td>
                            <td className='text-end'>{cantidadTotal()}</td>
                            <td className='text-end'>${precioTotal()}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>}*/}
        </div>
    )
}