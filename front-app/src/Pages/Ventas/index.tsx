import './styles.css'
import { useEffect, useState } from 'react'
import { InterProductos , InterVentas, ProductoVendido, } from "../../../interface"
import TablaVentas from '../../components/ventas/tabla';
import { mostrarTodosLosProductos , mostrarProductoNombre} from '../../functions/https/Productos/index'
import { AgregarProducto } from '../../functions/data/Productos/index'
import { realizarVenta } from '../../functions/https/ventas/index'

export default function Ventas(){
    const [eleSelc , setEleSelc] = useState<InterProductos>({
        id:0,
        nombre:'',
        precio:0,
        vendidos:0
    })
    const [cantidad , setCantidad] = useState<number>(1)
    const [total , setTotal] = useState<number[]>([0,0])
    const [prtsPorVender , setPrtsPorVender] = useState<InterProductos[]>([])
    const [elementos , setElementos] = useState<InterProductos[]>([])

    useEffect(() => {
        cargaDeElementos()
    },[])

    const cargaDeElementos = async () => {
        const aux = await mostrarTodosLosProductos()
        setElementos(aux)
    }

    const limpiar = () => {
        setTotal([0,0])
        setPrtsPorVender([])
    }

    const RealizarVenta = () => {
        if(prtsPorVender.length <= 0) return

        let aux:ProductoVendido[] = [];
        
        prtsPorVender.forEach((n) => {
            aux.push({id: n.id, vendidos: n.vendidos})
        })

        realizarVenta([...aux])
        limpiar()
    }

    const BorrarProducto = (id:number) => {
        let aux = prtsPorVender
        let eliminar:InterProductos = prtsPorVender.splice(id , 1)[0]
        setPrtsPorVender(aux);
        setTotal(n => 
            [n[0]-eliminar.vendidos,
            n[1]-eliminar.vendidos*eliminar.precio]
        )
    }
    
    const ObtenerEleSelc = async (nombre:string) => {
        const aux = await mostrarProductoNombre(nombre)
        setEleSelc(aux)
    }

    const AgreProducto = async () =>{
        if(cantidad <= 0 || eleSelc.nombre === "") return

        const aux:InterProductos[] = AgregarProducto({prtsPorVender,cantidad,eleSelc,setPrtsPorVender})
        setPrtsPorVender([...aux])
        setTotal(n => [n[0]+cantidad , n[1]+cantidad*eleSelc.precio])
        setCantidad(1)
    }

    return (
        <div className="containt100 d-flex flex-column align-items-center">
            <div className="box-desple-ventas centrado flex-column">
                <p>Productos</p>
                <select name="select" onChange={(e) => {e.preventDefault(); ObtenerEleSelc(e.target.value)}}>
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
                <button type="button" onClick={e => {e.preventDefault(); AgreProducto()}}>
                    Agregar
                </button>
            </div>
            <TablaVentas
                total={total}
                prtsPorVender={prtsPorVender}
                BorrarProducto={BorrarProducto}
            />
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