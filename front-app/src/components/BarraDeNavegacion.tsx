import { useState } from 'react'
import { Link, useLocation , useNavigate } from 'react-router-dom'
import './styles.css'

export function BarraDeNavegacion(){
    const location = useLocation().pathname
    const id:number = parseInt(useLocation().pathname.split('/')[3])
    const [btnEstado , setBtnEstado] = useState<boolean>(false)

    return (
        <nav className="navbar navbar-expand-lg bg-light box-barra-de-navegacion">
            <div className="container-fluid">
                <button className={`navbar-toggler ${!btnEstado ? 'collapsed' : ''}`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded={btnEstado} aria-label="Toggle navigation"
                onClick={e => {e.preventDefault() ; setBtnEstado(!btnEstado)}}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${btnEstado ? 'show' : ""}`} id="navbarText">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/" 
                                className="nav-link active" 
                                aria-current="page"
                                style={{color: `${location === '/' ? "red" : ""}`}} 
                                onClick={e => setBtnEstado(false)}
                            >Main</Link>
                        </li>
                        <li className={`nav-item`}>
                            <Link 
                                to="/Productos" 
                                className="nav-link active" 
                                aria-current="page" 
                                style={{
                                color: `${location === '/Productos' ||
                                location === `/Productos/Acciones/${id}`  
                                ? "red" : ""}`}}
                                onClick={e => setBtnEstado(false)}
                            >Productos</Link>
                        </li>
                        <li className={`nav-item` }>
                            <Link 
                                to="/Ventas" 
                                className="nav-link active" 
                                aria-current="page"
                                style={{color: `${location === '/Ventas' ? 'red' : ''}`}} 
                                onClick={e => setBtnEstado(false)}
                            >Ventas</Link>
                        </li>
                        <li className="nav-item"
                        >
                            <Link 
                                to="/Totales" 
                                className="nav-link active" 
                                aria-current="page"
                                style={{color: `${
                                    location === '/Totales' ||
                                    location === '/Totales/ventas' ||
                                    location === `/Totales/ventas/${id}` 
                                    ? "red" 
                                    : ""}`}}
                                onClick={e => setBtnEstado(false)}
                                >Totales</Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                to="/Ajustes" 
                                className="nav-link active" 
                                aria-current="page"
                                style={{color: `${location === '/Ajustes' ? "red" : ""}`}} 
                                onClick={e => setBtnEstado(false)}
                            >Ajustes</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}