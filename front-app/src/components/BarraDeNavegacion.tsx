import { Link } from 'react-router-dom'
import './styles.css'

export function BarraDeNavegacion(){
    return (
        <nav className="navbar navbar-expand-lg bg-light box-barra-de-navegacion">
          <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="/" className="nav-link active" aria-current="page" >Main</Link>
                </li>
                <li className="nav-item">
                  <Link to="/Productos" className="nav-link active" aria-current="page" >Productos</Link>
                </li>
                <li className="nav-item">
                  <Link to="/Ventas" className="nav-link active" aria-current="page" >Ventas</Link>
                </li>
                <li className="nav-item">
                  <Link to="/Totales" className="nav-link active" aria-current="page" >Totales</Link>
                </li>
                <li className="nav-item">
                  <Link to="/Ajustes" className="nav-link active" aria-current="page" >Ajustes</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    )
}