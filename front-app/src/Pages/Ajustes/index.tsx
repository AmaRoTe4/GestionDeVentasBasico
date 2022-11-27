import { ResetDataBase } from '../../functions/https/index'
import { useState } from 'react'
import './styles.css'
import Swal from 'sweetalert2'

export default function Ajustes(){
    const [contrasenia , setContrasenia] = useState<string>("")
    const clave = "1234"

    return (
        <div className="containt100 d-flex flex-column align-items-center">
            <div className="box-formulario-reset">
                <form className="box-cantidad-ventas">
                    <label htmlFor="contrasenia">Clave</label>
                    <input
                        value={contrasenia} 
                        type="text" 
                        id="contrasenia" 
                        name="contrasenia" 
                        onChange={e => setContrasenia(e.target.value)} 
                    />
                </form>
            </div>
            <div className="box-btn-reset centrado">
                <button 
                    disabled={contrasenia !== clave} 
                    className="btn btn-danger btn-reset"
                    onClick={e => {e.preventDefault();ResetDataBase(); Swal.fire({
                        title: 'Elinada con Exito!',
                        icon: 'success',
                        confirmButtonText: 'Ok',
                    })}}
                >    
                    Reset
                </button>
            </div>
        </div>
    )
}