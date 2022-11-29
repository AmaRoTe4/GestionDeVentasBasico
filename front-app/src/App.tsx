import './App.css'
import {Route , BrowserRouter , Routes} from 'react-router-dom'
import Main from './Pages/Main/Main'
import Totales from './Pages/Totales/index'
import VentasTotales from './Pages/Totales/Ventas'
import VentasTotalesIndividual from './Pages/Totales/Venta'
import Ventas from './Pages/Ventas/index'
import Ajustes from './Pages/Ajustes/index'
import Productos from './Pages/Productos/index'
import AccionesProductos from './Pages/Productos/acciones'
import { BarraDeNavegacion } from "./components/BarraDeNavegacion";
import { ToastContainer} from 'react-toastify'

function App() {
	return (
		<BrowserRouter>
			<BarraDeNavegacion />
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/Totales/" element={<Totales />} />
				<Route path="/Totales/Ventas" element={<VentasTotales />} />
				<Route path="/Totales/Ventas/:id" element={<VentasTotalesIndividual />} />
				<Route path="/Productos/" element={<Productos />} />
				<Route path="/Productos/acciones/:id" element={<AccionesProductos />} />
				<Route path="/Ventas" element={<Ventas />} />
				<Route path="/Ajustes" element={<Ajustes />} />
			</Routes>
			<ToastContainer />
		</BrowserRouter>
	)
}

export default App
