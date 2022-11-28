import { useEffect , useState } from "react";
import { useLocation  , useNavigate} from "react-router-dom";
import { InterProductos } from "../../../interface"
import { Link } from "react-router-dom";
import { mostrarProductoId, crearProducto , editarProducto } from "../../functions/https/Productos/index"
import './styles.css'

export default function AccionesProducto(){
    const navigate = useNavigate();
    const id:number = parseInt(useLocation().pathname.split('/')[3])
    const [nombre , setNombre] = useState<string>('')
    const [vendidos , setVendidos] = useState<number>(0)
    const [precio , setPrecio] = useState<number>(0)

    useEffect(() => {
        if(id === 0) return
        obtenerData(id)
    },[])

    const obtenerData = async (id:number) => {
        const aux:InterProductos = await mostrarProductoId(id);
        setNombre(aux.nombre)
        setPrecio(aux.precio)
        setVendidos(aux.vendidos)
    }
    
    const crear = () => {
        crearProducto(nombre , precio)
        setNombre("")
        setPrecio(0)
    }

    return (
        <div className="containt100 centrado flex-column">
            <div className="box-titulo-productos centrado">
                <h1>{id === 0 ? 'Agregar' : "Editar"}</h1>
            </div>
            <div className="box-formulario-productos centrado flex-column">
                <div className="centrado">
                    <label htmlFor="Name">Nombre</label>
                    <input 
                        value={nombre} 
                        type="text" 
                        id="Name" 
                        name="Name" 
                        onChange={e => setNombre(e.target.value)} 
                    />
                </div>
                <div className="centrado">
                    <label htmlFor="precio">Precio</label>
                    <input 
                        style={{textAlign: "end"}}
                        value={precio} 
                        type="number" 
                        id="precio" 
                        name="precio" 
                        onChange={e => setPrecio(e.target.value !== "" ? parseInt(e.target.value) : 0)} 
                    />
                </div>
            </div>
            <div className="box-buttom-productos centrado flex-column">
                <button 
                    className="btn btnProductos" 
                    style={{backgroundColor:"rgb(100 100 255)"}}
                    onClick={e => {
                        e.preventDefault() ; 
                        id === 0 
                        ? crear()
                        : editarProducto(nombre , precio , vendidos, id);
                        id !== 0 
                        ? navigate('/Productos')
                        : ""
                    }}
                >
                    {id === 0 ? 'Crear' : "Editar"}
                </button>
                <Link className="centrado" to='/Productos'
                    style={{backgroundColor:"rgb(255 60 60)"}}
                >
                    <button className="btn">
                        Volver
                    </button>
                </Link>
            </div>
        </div>
    )
}