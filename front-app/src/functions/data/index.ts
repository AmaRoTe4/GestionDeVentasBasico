import { InterProductos } from './../../../interface';
import { ProductoVendido , InterVentas } from "../../../interface";
import { mostrarProductoId } from "../https/Productos";

export const cantidadTotal = (array:ProductoVendido[]):number => {
    let aux = 0;
    for(let i = 0; i < array.length; i++) {
        aux += array[i].vendidos
    }
    return aux;
}  

export const precioTotal = async (array:ProductoVendido[]):Promise<number> => {
    let aux = 0;
    for(let i = 0; i < array.length; i++) {
        let precio:InterProductos = await mostrarProductoId(array[i].id)
        aux += precio.precio*array[i].vendidos
    }
    return aux;
} 

export const valoresAbsolutosPorVenta = async (ventas:InterVentas[]):Promise<InterVentas[]> => {
    let retorno:InterVentas[] = []

    for(let i = 0 ; i < ventas.length; i++){
        if(ventas[i].id === undefined || typeof(ventas[i].venta) !== "string") break

        const venta:ProductoVendido[] = JSON.parse(ventas[i].venta)
        const cantidad:number = cantidadTotal(venta)
        const precio:number = await precioTotal(venta)

        retorno.push(
            {
                id: ventas[i].id,
                cantidad:cantidad,
                precio:precio,
                productos: venta,
                venta:""
            }
        )
    }

    return retorno
}