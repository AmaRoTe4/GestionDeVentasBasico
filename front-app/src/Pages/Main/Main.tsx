import './styles.css'
import { Link } from "react-router-dom";

export default function Main(){
    return (
        <div className="containt100 centrado">
            <Link className="btn-ajuste-main centrado position-absolute top-0 end-0" to="Ajustes">
                <i className="fa-solid fa-gear"></i>
            </Link>
            <div className="box-links-main d-flex flex-column centrado">
                <Link className="btn-Links-main centrado" to="Productos">
                    <button className="btn">
                        Productos
                    </button>
                </Link>
                <Link className="btn-Links-main centrado" to="Ventas">
                    <button className="btn">
                        Ventas
                    </button>
                </Link>
                <Link className="btn-Links-main centrado" to="Totales">
                    <button className="btn">
                        Totales
                    </button>
                </Link>
            </div>
        </div>
    )
}