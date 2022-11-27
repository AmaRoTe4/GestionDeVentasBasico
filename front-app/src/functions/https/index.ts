import axios from 'axios'
import {InterProductos , InterProductosVendidos , InterVentas} from '../../../interface'

const pathVentas = 'http://localhost:7890/Ventas/' 
const pathProductos = 'http://localhost:7890/Productos/' 

export const ResetDataBase = async():Promise<void> => {
    const ventas = await axios.get(pathVentas)
    const productos = await axios.get(pathProductos)
    const infoVentas:InterVentas[] = ventas.data
    const infoProductos:InterProductos[] = productos.data
    const idVentas = infoVentas.map(n => n.id)
    const idProductos = infoProductos.map(n => n.id)

    for(let i = 0; i < idVentas.length; i++)  await axios.delete(pathVentas+idVentas[i])
    for(let i = 0; i < idProductos.length; i++)  await axios.delete(pathProductos+idProductos[i])
}

export const crearProducto = async(nombre:string , precio:number):Promise<void> => {    
    await axios.post(pathProductos ,{
        nombre,
        precio,
        vendidos:0
    });
}

export const editarProducto = async(nombre:string , precio:number , vendidos:number , id:number):Promise<void> => {
    await axios.put(pathProductos+id , {
        nombre,
        precio,
        vendidos:vendidos
});}

export const eliminarProducto = async(id:number):Promise<void> => {
    await axios.delete(pathProductos+id)
}