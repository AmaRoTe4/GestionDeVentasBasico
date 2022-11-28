import './styles.css'
import { Link } from "react-router-dom";

export default function Main(){
    return (
        <div className="containt100 d-flex flex-column align-items-center">
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